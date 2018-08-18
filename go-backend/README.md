<h1>RESTful Web Service with GO, Gorilla Mux, GORM, Sarama, and PostgreSQL</h1>

<h3>Steps to Run Program</h3>
<p>1. Create three Kafka brokers with ports  9092, 9093, and 9094 respectively</p>
<p>2. Create Kafka's topic named cash_deposit</p>
<p>3. Run those three Kafka's broker</p>
<p>4. Run the main.go file in the root directory</p>
<p>5. Create bank user by invoking RESTful web service with <a href="./assets/Create Bank User Payload.png"> this payload</a> for example </p> 
<p>6. Invoke deposit service (If the customer doesn't exist, the service will register the new customer) with <a href="./assets/Deposit Payload.png">this payload</a> for example</p>
<p>7. Get transaction history of <a href="./assets/Transaction History of Customers Payload.png">customers</a> or <a href="./assets/Transaction History by Account Number.png">related customer</a>.</p> 

<h3>Prerequisite:</h3>
<p>1. Golang</p>
<p>2. GORM</p>
<p>3. Gorilla Mux</p>
<p>4. Sarama</p>
<p>5. Apache Kafka</p>
