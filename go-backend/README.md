<h1>RESTful Web Service with GO, Gorilla Mux, GORM, and PostgreSQL</h1>

<h3>Steps to Run Program</h3>
<p>1. Create three Kafka brokers with ports  9092, 9093, and 9094 respectively</p>
<p>2. Create Kafka's topic named cash_deposit</p>
<p>3. Run those three Kafka's broker</p>
<p>4. Run <a href="./messages/consumer/kafka-consumer.go">this Kafka's consumer</a> and please ensure that your email and DB credentials are correct</p> 
<p>5. Create bank user by invoking RESTful web service with <a href="./assets/Create Bank User Payload.png"> this payload</a> for example </p> 
<p>6. Invoke deposit service (If the customer doesn't exist, the service will register the new customer) with <a href="./assets/Deposit Payload.png">this payload</a> for example</p>
<p>7. Get transaction history of <a href="./assets/Transaction History of Customers Payload.png">customers</a> or <a href="./assets/Transaction History by Account Number.png">related customer</a>.</p> 
