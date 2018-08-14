package models

type BankUser struct {
	UserAccount string     `gorm:"primary_key" json:"user_account"`
	UserName    string     `json:"user_name"`
	Password    string     `json:"password"`
	Customers   []Customer `gorm:"ForeignKey:UserAcc" json:"customers"`
}
