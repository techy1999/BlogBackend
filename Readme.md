 [![Node.js CI](https://github.com/techy1999/BlogBackend/actions/workflows/node.js.yml/badge.svg)](https://github.com/techy1999/BlogBackend/actions/workflows/node.js.yml)
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



## How Creating Indexing mongodb efficiently increase our search query
- MongoDB mainly uses ```COLSCAN ``` and ``` IXSCAN```
- Current we have only index on title ```title_1```, as it will impact write performance.Because Internally Indexes uses B-tree which take time to sort and arrange in Balancing the tree.
  
## See below screenshot to understand it.
> Before Creating Index, we search all through the document to find out our document, see ```documentscaned-27``` and ```returned-6 ```
![Left Image](https://github.com/techy1999/BlogBackend/assets/116334237/e1d305ca-7269-47ca-b728-2701512bdab3) 


> After Creating Index, we search onB-tree , see ```documentscaned-6``` and ```returned-6 ```
![Right Image](https://github.com/techy1999/BlogBackend/assets/116334237/d9deb0ca-8d5a-4165-837e-34a20de91e23)






