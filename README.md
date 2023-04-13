# Basic Node, Express, TS API Project utilizing the Youtube Data API

## Initial Setup Steps

After opening the zip make a .env file in the project folder and copy in the below information   

All Postman routes are included seperately in a json file inside the repository.  
This contains the **postman** collection.  

## .env File Information
```
SERVER_HOSTNAME=locahost  
SERVER_PORT=1337  
APIKEY= Replace with your own Google API Key
DB_HOST=db  
DB_USER=postgres  
DATABASE=postgres  
DB_PASSWORD=password  
DB_PORT=5432  
DB_POOL_SIZE=2  
DB_POOL_CLIENT_IDLE_TIMEOUT=10000  
DB_POOL_CLIENT_CONNECTION_TIMEOUT=2000  
WAIT_HOST=db:5432  
```
# Launching The Application

1. To Launch the application:
  ```run docker-compose up -d --build  ```
  
  At this point the application will be running and ready to go, so long as you have docker installed and prepared the .env file appropriately.  

2. To Close the application:
  ```run docker-compose down -v  ```


