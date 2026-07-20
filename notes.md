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