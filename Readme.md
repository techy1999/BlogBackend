# Nomads Blog Backend

## System Design 

![nomads solutiondd](https://github.com/techy1999/BlogBackend/assets/116334237/fb27607c-3af8-402d-9390-29f2a82dd503)





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

## Check API Documentation at END point

> /api-docs

![apidocs](https://github.com/techy1999/BlogBackend/assets/116334237/c7864cf6-7ea1-4644-9231-ba12adf53d6b)



