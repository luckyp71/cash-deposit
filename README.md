
<h1> Cash Deposit App with Go, Apache Kafka, Angular 6, PostgreSQL, and Docker </h1>

<div>
<img src="./assets/Cash_Deposit.png" height="500pt" width="1800pt"/>
</div>


<h3> Use Cases: </h3>
<h4>Customer:</h4>
<p>1. Customer accesses website via browser to deposit</p>
<p>2. Web browser makes request to the frontend app (Angular 6)</p>
<p>3. Frontend app makes request to the backend (Golang) by invoking the backend's RESTful web service</p>
<p>4. Web service (Kafka Producer) send data to the Kafka's topic (cash_deposit)</p>
<p>5. Kafka Consumer get data from Kafka's topic (cash_deposit) as well as sending data to the DB and mail via SMTP</p>
<p>6. DB send response data</p>
<p>7.  Web service receive response data from DB and pass data to the frontend.</p>

<h4>Bank Officer:</h4>
<p>1. Bank officer accesses website via browser to get the transaction history of all customers or the related customer only</p>
<p>2. Web browser makes request to the frontend app (Angular 6)</p>
<p>3. Frontend app makes request to the backend (Golang) by invoking the backend's RESTful web service</p>
<p>4. Web service send request to DB</p>
<p>5. DB send response data</p>
<p>6. Web service receive response data from DB and pass data to the frontend.</p>
