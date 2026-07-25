<!-- how api gateway communicate with user service with TCP protocol -->

Browser
   │
HTTP Request
   ▼
API Gateway
   │
ClientProxy.send()
   │
TCP
   ▼
User Service
   │
@MessagePattern()
   ▼
Returns Data
   │
TCP
   ▼
API Gateway
   │
HTTP Response
   ▼
Browser


<!-- communicate channel of api gateway
 -->

 API Gateway
     │
ClientProxy
     │
 TCP
     ▼
User Service


<!--Authentication Microservice -->

                        Browser
                           │
                        HTTP REST
                           ▼
                    API Gateway
                           │
            ┌──────────────┴──────────────┐
            │                             │
            │ TCP                         │ TCP
            ▼                             ▼
      Auth Service                 User Service
            │                             │
            │ asks                        │
            └──────────────► Find User ◄──┘
                           │
                           ▼
                     User Information
                           │
                           ▼
                    Auth Service
                           │
                     Generate JWT
                           │
                           ▼
                     API Gateway
                           │
                           ▼
                        Browser



<!-- microservice global customer exception filter  -->

GET /users/50
      │
      ▼
API Gateway
      │
ClientProxy.send()
      │
TCP
      ▼
User Service
      │
throw new UserNotFoundException(50)
      │
RpcException payload
      ▼
Gateway Filter
      │
HTTP Response
      ▼
Browser


<!-- Architecture after adding data source for migrations -->

                    PostgreSQL
                         ▲
                         │
        ┌────────────────┴──────────────┐
        │                               │
 NestJS Runtime                    TypeORM CLI
 DatabaseModule                    data-source.ts
        │                               │
 HTTP/TCP Requests            Generate & Run Migrations



<!-- folder architcture after adding rabbitmq -->

apps
│
├── api-gateway
│   │
│   ├── src
│   │    ├── app.module.ts
│   │    ├── main.ts
│   │    ├── config
│   │    │      rabbitmq.config.ts
│   │    │
│   │    └── users
│   │
│   └── .env
│
├── user-service
│   │
│   ├── src
│   │    ├── app.module.ts
│   │    ├── main.ts
│   │    ├── config
│   │    │      database.config.ts
│   │    │      rabbitmq.config.ts
│   │    │
│   │    ├── database
│   │    └── users
│   │
│   └── .env
│
└── libs
     └── common
          └── rabbitmq
 



<!-- this  Architecture after user service use rqbbitmq broker-->
                 API Gateway
                      │
             ClientProxy.send()
                      │
                      ▼
              RabbitMQ Exchange*
                      │
                      ▼
                 user.queue
                      │
                      ▼
               RabbitMQ Consumer
                      │
                      ▼
        @MessagePattern("users.create")
                      │
                      ▼
                 UsersService
                      │
                      ▼
                 Repository





Desired Architecture
Notice that the User Service is now both:
A consumer (receives users.create commands).
A publisher (publishes user.created events).

                HTTP Request
                     │
                     ▼
              API Gateway
                     │
          send('users.create')
                     │
                     ▼
               RabbitMQ Queue
                     │
                     ▼
              User Service
                     │
              Create User

                     │
        emit('user.created')
                     │
                     ▼
               RabbitMQ Exchange
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
 Notification Service      Future Services
      Send Email          Analytics / Audit

