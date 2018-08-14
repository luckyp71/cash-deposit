package main

import (
	"bytes"
	c "cash-deposit/go-backend/controllers"
	m "cash-deposit/go-backend/models"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func Router() *mux.Router {
	router := mux.NewRouter()
	sub := router.PathPrefix("/cash_deposit").Subrouter()
	sub.HandleFunc("", c.PostDeposit).Methods("POST")
	sub.HandleFunc("/users", c.CreateBankUser).Methods("POST")
	sub.HandleFunc("", c.GetCustomersDeposit).Methods("GET")
	sub.HandleFunc("/detail/{account_number}", c.GetCustomerDepositByAccountNumber).Methods("GET")
	return sub
}

// Test Post Deposit
func TestPostDeposit(t *testing.T) {
	c.DbConfig()
	customer := m.Customer{
		AccountNumber: "test123",
		CustomerName:  "test_user_name",
		UserAcc:       "12",
	}
	jsonUser, _ := json.Marshal(customer)
	request, _ := http.NewRequest("POST", "/cash_deposit", bytes.NewBuffer(jsonUser))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, http.StatusOK, response.Code)
}

// Test create bank user
func TestCreateBankUser(t *testing.T) {
	c.DbConfig()
	bankUser := m.BankUser{
		UserAccount: "00121s3221",
		UserName:    "luckypratamma",
		Password:    "pratama",
	}
	jsonBankUser, _ := json.Marshal(bankUser)
	request, _ := http.NewRequest("POST", "/cash_deposit/users", bytes.NewBuffer(jsonBankUser))
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, http.StatusOK, response.Code, "OK response is expected")
}

// Test get customers deposit
func TestGetCustomersDeposit(t *testing.T) {
	c.DbConfig()
	request, _ := http.NewRequest("GET", "/cash_deposit", nil)
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, http.StatusOK, response.Code, "OK response is expected")
}

// Test get customer deposit by account number
func TestGetCustomerDepositByAccountNumber(t *testing.T) {
	c.DbConfig()
	request, _ := http.NewRequest("GET", "/cash_deposit/detail/123p", nil)
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, http.StatusOK, response.Code, "OK response is expected")
}
