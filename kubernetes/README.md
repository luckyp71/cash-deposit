<h1>Deploy postgres, angular6-frontend, and go-backend containers to Kubernetes using Kompose</h1>

<h3>Steps to Run and Stop the Program</h3>
<p>1. Run step 1 until 3 <a href="../README.md">here</a></p>
<p>2. Run <strong>kubectl proxy</strong> command</p>
<p>3. Run <strong>kompose up</strong> command inside this directory (cash-deposit/kubernetes)</p>
<p>If everything goes well, the command will deploy cashdeposit_angular6-frontend, cashdeposit_go-docker, and cashdeposit_db containers to Kubernetes. You may check the deployment on Kubernetes Dashboard here: 
<href="http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/login">http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/#!/login</a></p> 
<h3>kompose up</h3>
<div>
<img src="./assets/kompose-up.png" height="300pt" width="600pt"/>
</div>
<h3>Dashboard 1</h3>
<div>
<img src="./assets/Dashboard1.png" height="500pt" width="1800pt"/>
</div>
<h3>Dashboard 2</h3>
<div>
<img src="./assets/Dashboard2.png" height="500pt" width="1800pt"/>
</div>
<h3>Dashboard 3</h3>
<div>
<img src="./assets/Dashboard3.png" height="500pt" width="1800pt"/>
</div>