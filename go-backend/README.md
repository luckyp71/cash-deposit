<h1>RESTful Web Service with GO, Gorilla Mux, GORM, Sarama, PostgreSQL, and Docker</h1>

<h3>Steps to Run Program</h3>
<p>1. Since the project used multi Kafka's brokers, you must create three Kafka brokers with ports 9092, 9093, and 9094 respectively</p>
<p>2. Create Kafka's topic named cash_deposit</p>
<p>3. Run those three Kafka's brokers</p>
<p>4. If you'd like to run the project inside Docker, you could either build then run the image using Docker Compose with commands:</p>
<h4>Mechanism 1: Use the following commands if it's your initial build</h4>
<p>a. docker-compose up db (the command will run postgres in port 5439 as it's specified inside docker-compose.yml file and please ensure that your postgres's host, port as well as credential are correctly provided on it.)</p>
<p>b. docker-compose up web (the command will run go-backend app in port 8080, but before run the command, please ensure also that the postgres and email host, port and credentials are correctly provided on kafka-consumer.go, email.go, as well as main.go files)</p>
<h4>Mechanism 2: Use the following commands if the image has already built</h4>
<p>a. docker run -d -p 8080:8080 cashdeposit_web (this is the image name of go-backend app which is built in the mechanism 1)</p>
<p>b. docker run --name postgres -e POSTGRES_PASSWORD=your_password -d -p 5439:5432 postgres</p>
<p>4.1. If you don't use docker to run the app, just simply run command: go run main.go in the root directory of the go-backend app</p>
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
