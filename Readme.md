# Nomads Blog Backend

### Technology
- Nodejs
- Express
- Mongodb
- Mongoose
- Swagger
- AWS


### Packages used:-
- > Morgan  
    - A package that show the requested URL and response.
- > Swagger-ui-express 
    - To create UI with the api endpoints
- > Swagger autogen  
    - A package that autmatically generate the api documentation
- > dotent 
    - Access Env value, in future replace with aws parameter fetch
- > mongoose 
    - Mongodb ODM
->  express-rate-limit
    - Rate limiting on the request , keep it updating depending on requirements.

Tools - 
- aws for hosting
- CI/CD Pipeline 
- swagger for api documentation


# Response Format

```

{
  "error": {
    "message":"your message",
    "description:"from code",
  },
  "message": null,
  "httpStatus": 401,
  "data": null
}

```