package main

import (
	c "cash-deposit/go-backend/controllers"
	consumer "cash-deposit/go-backend/messages/consumer"
	"sync"
)

var wg sync.WaitGroup

func main() {
	wg.Add(2)
	go c.Router()
	go consumer.Consumer()
	wg.Wait()
}
