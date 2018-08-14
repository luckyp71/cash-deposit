package controllers

import (
	c "cash-deposit/go-backend/messages/producer"
	m "cash-deposit/go-backend/models"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

var db *gorm.DB
var e error

var deposit m.DepositAccount
var bankUser m.BankUser
var customer m.Customer
var result m.Result

func Router() {
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
	router := mux.NewRouter()
	sub := router.PathPrefix("/cash_deposit").Subrouter()
	sub.HandleFunc("", PostDeposit).Methods("POST")
	sub.HandleFunc("/users", CreateBankUser).Methods("POST")
	sub.HandleFunc("", GetCustomersDeposit).Methods("GET")
	sub.HandleFunc("/balance/{account_number}", GetTotalBalanceByAccountNumber).Methods("GET")
	sub.HandleFunc("/detail/{account_number}", GetCustomerDepositByAccountNumber).Methods("GET")
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"}),
		handlers.AllowedOrigins([]string{"*"}))(sub)))
}

// DB Configuration for unit testing
func DbConfig() {
	db, e = gorm.Open("postgres", "user=postgres password=testpassword dbname=postgres sslmode=disable")
	if e != nil {
		fmt.Println(e)
	} else {
		fmt.Println("Connection Established")
	}
	db.SingularTable(true)
	db.AutoMigrate(&m.BankUser{}, &m.Customer{}, &m.DepositAccount{})
	db.Model(&m.Customer{}).AddForeignKey("user_acc", "bank_user(user_account)", "CASCADE", "CASCADE")
	db.Model(&m.DepositAccount{}).AddForeignKey("acc_number", "customer(account_number)", "CASCADE", "CASCADE")
}

// Create new bank officer
func CreateBankUser(w http.ResponseWriter, r *http.Request) {
	var _ = json.NewDecoder(r.Body).Decode(&bankUser)
	db.Create(&bankUser)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Response-Code", "00")
	w.Header().Set("Response-Desc", "Success")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&bankUser)
}

// Post deposit as well as sending its data to kafka topic
func PostDeposit(w http.ResponseWriter, r *http.Request) {
	err := json.NewDecoder(r.Body).Decode(&customer)
	if err != nil {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Response-Code", "06")
		w.Header().Set("Response-Desc", "ERROR!!!!! Please Check The Request Payload")
		w.WriteHeader(http.StatusBadRequest)
	} else {
		c.ProduceMessage(customer)
		// Check wheter the customer exists, if so the http status will return status ok otherwise it returns status not found
		if e := db.Where("user_account = ?", customer.UserAcc).Preload("Customers").First(&bankUser).Error; e != nil {
			log.Println("Record Not Found!!!")
			w.Header().Set("Content-Type", "application/json")
			w.Header().Set("Response-Code", "06")
			w.Header().Set("Response-Desc", "Record Not Found")
			w.WriteHeader(http.StatusNotFound)
		} else {
			w.Header().Set("Content-Type", "application/json")
			w.Header().Set("Reponse-Code", "00")
			w.Header().Set("Response-Desc", "success")
			w.WriteHeader(http.StatusOK)
			json.NewEncoder(w).Encode(&customer)
		}
	}
}

// Get history of customers deposit account
func GetCustomersDeposit(w http.ResponseWriter, r *http.Request) {
	var customers []m.Customer
	if e := db.Preload("DepositAccounts").Find(&customers).Error; e != nil {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Response-Code", "06")
		w.Header().Set("Response-Desc", "Internal Server Error")
		w.WriteHeader(http.StatusInternalServerError)
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Response-Code", "00")
		w.Header().Set("Response-Desc", "Success")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(&customers)
	}
}

// Get history of customer's deposit account by customer's account number
func GetCustomerDepositByAccountNumber(w http.ResponseWriter, r *http.Request) {
	var customer m.Customer
	param := mux.Vars(r)
	if e := db.Where("account_number = ?", param["account_number"]).Preload("DepositAccounts").First(&customer).Error; e != nil {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Response-Code", "06")
		w.Header().Set("Response-Desc", "Data Not Found")
		w.WriteHeader(http.StatusNotFound)

	} else {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Response-Code", "00")
		w.Header().Set("Response-Desc", "Success")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(&customer)
	}
}

// Get total balance of customer by account number
func GetTotalBalanceByAccountNumber(w http.ResponseWriter, r *http.Request) {
	var results m.Result
	param := mux.Vars(r)
	//	if e := db.Table("deposit_account").Select("acc_number, sum(amount) as total").Group("acc_number").Having("acc_number = ? ", param["account_number"]).Scan(&results).Error; e != nil {
	if e := db.Table("deposit_account").Select("sum(amount) as total").Group("acc_number").Having("acc_number = ? ", param["account_number"]).Scan(&results).Error; e != nil {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Response-Code", "06")
		w.Header().Set("Response-Desc", "Data Not Found")
		w.WriteHeader(http.StatusNotFound)
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Response-Code", "00")
		w.Header().Set("Response-Desc", "Success")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(&results)
	}
}
