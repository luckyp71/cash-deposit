package main

import (
	mail "cash-deposit/go-backend/email"
	"cash-deposit/go-backend/models"
	"encoding/json"
	"log"

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
var deposit models.DepositAccount
var bankUser models.BankUser
var customer models.Customer

func main() {
	db, e = gorm.Open("postgres", "user=postgres password=pratama dbname=testpassword sslmode=disable")
	if e != nil {
		log.Fatal(e)
	}
	defer db.Close()
	db.SingularTable(true)
	db.AutoMigrate(&models.BankUser{}, &models.Customer{}, &models.DepositAccount{})
	db.Model(&models.Customer{}).AddForeignKey("user_acc", "bank_user(user_account)", "CASCADE", "CASCADE")
	db.Model(&models.DepositAccount{}).AddForeignKey("acc_number", "customer(account_number)", "CASCADE", "CASCADE")

	consumeMessage()
}

func consumeMessage() {
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

		text := string(m.Value)
		bytes := []byte(text)

		json.Unmarshal(bytes, &customer)

		customer = models.Customer{AccountNumber: customer.AccountNumber, CustomerName: customer.CustomerName,
			UserAcc: customer.UserAcc, DepositAccounts: customer.DepositAccounts}

		if e := db.Where("account_number = ?", customer.AccountNumber).First(&customer).Error; e != nil {
			db.Create(&customer)
		} else {
			db.Save(&customer)
		}
		log.Println("Deposit executed successfully")
		mail.SendEmail(bankUser.UserName, customer.AccountNumber)

	}

}
