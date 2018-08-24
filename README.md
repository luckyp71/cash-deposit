
<h1> Cash Deposit App with Go, Apache Kafka, Angular 6, PostgreSQL, and Docker </h1>

<div>
<img src="./assets/Cash_Deposit.png" height="500pt" width="1800pt"/>
</div>

<h3>Steps to Run and Stop the Program</h3>
<p>1. Run <strong>docker-compose up -d</strong> command in cash-deposit root directory</p>
<p>If everything goes well, the command will create and run cash-deposit with angular6-frontend and go-docker tags images as well as run postgres image below:</p> 
<div>
<img src="./assets/docker-compose-up.png" height="300pt" width="700pt"/>
</div>
<p>2. Now you may check that those three app are running in docker container</p>
<div>
<img src="./assets/docker-ps.png" height="300pt" width="700pt"/>
</div>
<p>3. To stop and remove those three running containers, you could simply run <strong>docker-compose down</strong></p>
<div>
<img src="./assets/docker-compose-down.png" height="300pt" width="700pt"/>
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
