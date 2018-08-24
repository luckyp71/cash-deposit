package producer

import (
	m "cash-deposit/go-backend/models"
	"encoding/json"
	"log"
	"strconv"
	"time"

	"github.com/Shopify/sarama"
)

const (
	BROKER1     string = "192.168.43.237:9092"
	BROKER2     string = "192.168.43.237:9093"
	BROKER3     string = "192.168.43.237:9094"
	KAFKA_TOPIC string = "cash_deposit"
)

func ProduceMessage(customer m.Customer) {
	reqData, err := json.Marshal(&customer)
	if err != nil {
		log.Fatal(err)
	}

	reqString := string(reqData)
	config := sarama.NewConfig()
	config.Producer.Retry.Max = 5
	config.Producer.RequiredAcks = sarama.WaitForAll
	brokers := []string{BROKER1, BROKER2, BROKER3}
	producer, err := sarama.NewAsyncProducer(brokers, config)
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := producer.Close(); err != nil {
			panic(err)
		}
	}()

	strTime := strconv.Itoa(int(time.Now().Unix()))

	msg := &sarama.ProducerMessage{
		Topic: KAFKA_TOPIC,
		Key:   sarama.StringEncoder(strTime),
		Value: sarama.StringEncoder(reqString),
	}

	producer.Input() <- msg

}
