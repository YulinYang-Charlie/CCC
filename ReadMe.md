# CCC Deployment

## 1. Project Introduction
There are four parts in this project. 
- CCCBackEnd: stores all backend data, which is built by Java and Springboot.
- data_harvester: stores all codes about harvester applicaiton, which is implemented by python3
- frontend: stores all codes for frontend web application.
- mrc: stores all ansible scripts for init and deployment

## 2. Projecy Deployment
You should go into the mrc directory firstly!
### 2.1 Init instance
```shell 
. ./init_instance.sh
``` 
Notice: Before run the shell file, you have to get the password of the mrc.

#### 2.1.1 Instance configure
1. Once the instances are created, you should edit "host.yaml" in your personal computer. Put the ips into the host.yaml for Ansible host management
2. In the "host.yaml", you could name the ip groups for Ansible host variable.
```shell
[Frontend]
ip1
ip2

[couchdb]
ip1
ip2
ip3
```
### 2.2 Set docker
```shell 
. ./set_docker.sh
``` 
Notice: docker and docker compose are installed here

### 2.3 Set couchdb-cluser
```shell 
. ./set_couch_db_cluster.sh
``` 
### 2.4 Set Backend
```shell
. ./set_backend.sh
```
#### 2.4.1 Docker run Backend
The Backend is deployed by docker compose in the instance. If you want to change backend containner configuraitons, please visit docker file and docker 
conpose file in CCCBackend
### 2.5 Set Frontend
```shell
. ./set_frontend.sh
```
#### 2.5.1 Docker run Frontend
The frontend is deployed by ansible scripts. In ansible scripts, we use  docker compose to run the frontend application.
if you want to update containner name, please check docker compose file in frontend directory.
### 2.6 Set harvest
```shell
. ./set_harvest.sh
```



