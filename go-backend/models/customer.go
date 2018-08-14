package models

type Customer struct {
	AccountNumber   string           `gorm:"primary_key" json:"account_number"`
	CustomerName    string           `json:"customer_name"`
	UserAcc         string           `json:"user_acc"`
	DepositAccounts []DepositAccount `gorm:"ForeignKey:AccNumber" json:"deposit_accounts"`
}
