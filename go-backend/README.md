<h1>RESTful Web Service with GO, Gorilla Mux, GORM, Sarama, PostgreSQL, and Docker</h1>

<h3>Steps to Run Program</h3>
<p>1. Since the project used multi Kafka's brokers, you must create three Kafka brokers with ports 9092, 9093, and 9094 respectively</p>
<p>2. Create Kafka's topic named cash_deposit</p>
<p>3. Run those three Kafka's brokers</p>
<p>4. If you'd like to run the project inside Docker, you could build then run the image using docker-compose as mentioned <a href="../README.md">here</a>
<p>4.1. If you don't use docker to run the app, just simply use command: go run main.go in the root directory of the go-backend app</p>
<p>5. Create bank user by invoking RESTful web service with <a href="./assets/Create Bank User Payload.png"> this payload</a> for example </p> 
<p>6. Invoke deposit service (If the customer doesn't exist, the service will register the new customer) with <a href="./assets/Deposit Payload.png">this payload</a> for example</p>
<p>7. Get transaction history of <a href="./assets/Transaction History of Customers Payload.png">customers</a> or <a href="./assets/Transaction History by Account Number.png">related customer</a>.</p> 

<h3>Prerequisites</h3>
<p>1. Golang</p>
<p>2. GORM</p>
<p>3. Gorilla Mux</p>
<p>4. Sarama</p>
<p>5. Apache Kafka</p>
<p>6. Docker</p>
