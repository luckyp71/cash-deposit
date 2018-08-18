package main

import (
	c "cash-deposit/go-backend/controllers"
	consumer "cash-deposit/go-backend/messages/consumer"
	"sync"

	m "cash-deposit/go-backend/models"
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB
var e error
var wg sync.WaitGroup

func main() {

	db, e = gorm.Open("postgres", "user=postgres password=testpassword dbname=postgres sslmode=disable")
	if e != nil {
		fmt.Println(e)
	} else {
		fmt.Println("Connection Established")
	}
	defer db.Close()
	db.SingularTable(true)
	db.AutoMigrate(&m.BankUser{}, &m.Customer{}, &m.DepositAccount{})
	db.Model(&m.Customer{}).AddForeignKey("user_acc", "bank_user(user_account)", "CASCADE", "CASCADE")
	db.Model(&m.DepositAccount{}).AddForeignKey("acc_number", "customer(account_number)", "CASCADE", "CASCADE")

	wg.Add(1)
	go consumer.Consumer()
	go c.Router()
	wg.Wait()
}
