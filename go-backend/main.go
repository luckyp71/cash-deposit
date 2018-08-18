package main

import (
	c "cash-deposit/go-backend/controllers"
	consumer "cash-deposit/go-backend/messages/consumer"
	"sync"
)

var wg sync.WaitGroup

func main() {
	wg.Add(1)
	go consumer.Consumer()
	go c.Router()
	wg.Wait()

}
