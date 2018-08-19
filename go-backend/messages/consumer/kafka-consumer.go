package consumer

import (
	mail "cash-deposit/go-backend/email"
	"cash-deposit/go-backend/models"
	"encoding/json"
	"log"

	"sync"

	"github.com/Shopify/sarama"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

const (
	BROKER1     string = "localhost:9092"
	BROKER2     string = "localhost:9093"
	BROKER3     string = "localhost:9094"
	KAFKA_TOPIC string = "cash_deposit"
)

var db *gorm.DB

var e error

var wg sync.WaitGroup

func Consumer() {
	db, e = gorm.Open("postgres", "user=postgres password=testpassword dbname=postgres sslmode=disable")
	if e != nil {
		log.Fatal(e)
	}
	defer db.Close()

	ConsumeMessage()
	wg.Done()
}

func ConsumeMessage() {
	config := sarama.NewConfig()
	config.Producer.Partitioner = sarama.NewManualPartitioner
	config.Consumer.Return.Errors = true
	brokers := []string{BROKER1, BROKER2, BROKER3}

	consumer, err := sarama.NewConsumer(brokers, config)
	if err != nil {
		panic(err)
	}

	partitionConsumer, err := consumer.ConsumePartition(KAFKA_TOPIC, 0, sarama.OffsetNewest)
	if err != nil {
		panic(err)
	}

	log.Print("Connected to kafka broker")
	for m := range partitionConsumer.Messages() {

		var bankUser = models.BankUser{}
		var customer = models.Customer{}

		log.Println(m.Offset)

		text := string(m.Value)
		bytes := []byte(text)

		// Decode text
		json.Unmarshal(bytes, &customer)
		log.Println(string(bytes))
		log.Println(customer.UserAcc)
		userAcc := customer.UserAcc
		log.Println(customer.CustomerName)

		if e := db.Debug().Raw("SELECT * FROM bank_user WHERE bank_user.user_account = '" + userAcc + "'").First(&bankUser).Error; e != nil {
			log.Fatal(e)
		} else {
			if e := db.Debug().Where("account_number = ?", customer.AccountNumber).First(&customer).Error; e != nil {
				db.Debug().Create(&customer)
			} else {
				db.Debug().Save(&models.Customer{AccountNumber: customer.AccountNumber, CustomerName: customer.CustomerName,
					UserAcc: customer.UserAcc, DepositAccounts: customer.DepositAccounts})
				//				db.Debug().Save(&customer)
			}
			log.Println("Deposit executed successfully")
			mail.SendEmail(bankUser.UserName, customer.AccountNumber)
		}

	}
}
