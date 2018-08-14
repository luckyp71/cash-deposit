package models

type DepositAccount struct {
	TrxNumber string `gorm:"primary_key" json:"trx_number"`
	Amount    uint64 `json:"amount"`
	AccNumber string `json:"acc_number"`
}
