#Creatopy Challenge BY kadismile

##### *TEST COULDN"T BE WRITTEN COS OF THE TIME ALLOCATED

## Getting the database setup

you will need Docker in order to install a containerised Mysql dev
environment. After getting docker, run the following command anywhere:

```sh
docker run \
    -p 0.0.0.0:7000:3306 \
    --name creatopy \
    -e MYSQL_ROOT_PASSWORD=password \
    -e MYSQL_USER=admin \
    -e MYSQL_PASSWORD=password \
    -e MYSQL_DATABASE=creatopy-db \
    -d mysql:5.7.20
```

this will create a Docker instance called `creatopy`, running Mysql
v5.7.20 with root password being `password`. It also creates a 
database called `creatopy-db`, creates a user called `admin` (with password
`password`) and assigns that user full permissions onto `creatopy-db`
database.

## APP STRUCTURE
##### This Comprises of the ```Services ``` and ```Client ``` both will be run individually not concurrently.


##### 1. After the above docker command is run , ensure ```REDIS SERVER```  is running too 
##### 2. cd into services folder and run the following  ```yarn db:migrate``` and ```yarn watch ``` to start the services (back-end)
##### 3. cd into client directory and run ```npm start```
##### 4. Also for mails to send ensure u put the right ```env``` variables by creating your own env variables following the example provided on ```.env.example``` format
