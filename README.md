# <p align = "center"> DrivenPass </p>

<br>
<br>

##  :clipboard: Description

- Allows the user to register credential, secure note, card and wifi.

***

## :computer:	 Technologies and Concepts

- REST APIs
- JWTs & refresh tokens
- Node.js
- TypeScript
- Postgres with prisma

***

## :rocket: API

```yml
POST /sign-up
    - Route to register a new user
    - headers: {}
    - body:{
        "email": "max@gmail.com",
        "password": "1234567890"
}
```
    
```yml 
POST /sign-in
    - Route to login
    - headers: {}
    - body: {
        "email": "max@gmail.com",
        "password": "1234567890"
}
```
    
```yml 
POST /create-credential (authenticated)
    - Route to create a new credential
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "password": "123456",
        "url": "https://www.youtube.com/watch?v=WO5eaLu-ezo",
        "username": "rachel",
        "title": "video"
}
```

```yml
GET /credential/:id (authenticated)
    - Route to list a user credential by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /credentials (authenticated)
    - Route to list all user credentials
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /delete-credential/:id (authenticated)
    - Route to delete user credential
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml 
POST /create-note (authenticated)
    - Route to create a new note
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "title": "test",
        "annotation":"programming"
}
```

```yml
GET /note/:id (authenticated)
    - Route to list a user note by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /notes (authenticated)
    - Route to list all user notes
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /delete-note/:id (authenticated)
    - Route to delete user note
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml 
POST /create-card (authenticated)
    - Route to create a new card
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "number": "4828634390199378",
        "printedName": "Layla P S Cruz",
        "securityCode": "545",
        "expirationDate": "01/23",
        "password": "123456",
        "isVirtual": false,
        "type": "debit",
        "title": "debit card"
}
```

```yml
GET /card/:id (authenticated)
    - Route to list a user card by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /cards (authenticated)
    - Route to list all user cards
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /delete-card/:id (authenticated)
    - Route to delete user card
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml 
POST /create-wifi (authenticated)
    - Route to create a new wifi
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "networkName":"Test",
        "password": "123456",
        "title": "test"
}
```

```yml
GET /wifi/:id (authenticated)
    - Route to list a user wifi by id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
GET /wifis (authenticated)
    - Route to list all user wifis
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
DELETE /delete-wifi/:id (authenticated)
    - Route to delete user wifi
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

***

## 🏁 Running the application

Make sure you have the latest stable version of [Node.js](https://nodejs.org/en/download/) e [npm](https://www.npmjs.com/) running locally.

First, clone this repository on your machine:

```
git clone https://github.com/anaraquelmatos/drivenpass.git
```

Then, inside the folder, run the following command to install the dependencies.

```
npm install
```

Finished the process, just start the server.
```
npm start
```
