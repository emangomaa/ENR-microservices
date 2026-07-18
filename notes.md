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

