# Secure Sneakers
An e-commerce web application that sells various sneakers online.

### Prerequisites
* Node.js - https://nodejs.org/en/
* npm - https://www.npmjs.com/
* MongoDB - https://www.mongodb.com/download-center?jmp=nav#community

### Set-up Instructions
For MongoDB:
1. Install MongoDB
2. Set up the MongoDB environment
3. Start MongoDB
    * Run `mongod` (ref: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#run-mongodb-community-edition)
4. Import data (ref: https://docs.mongodb.com/manual/reference/program/mongoimport/#use)
      * Open `secure-sneakers/data` directory in command prompt with administrator permissions
      * Run `mongoimport --db secure-sneakers --collection products --file products.json` to import product collection (if command is unrecognized - add `C:\Program Files\MongoDB\Server\3.6\bin` to environment variables)

For server (back-end):
1. Install dependencies:
    * Open `server` directory in command prompt
    * Run `npm install`
2. Start server:
    * Run `npm start`
    * Navigate to `localhost:3000` in browser

For client (front-end):
1. Install dependencies:
    * Open `client` directory in command prompt
    * Run `npm install`
2. Start server:
    * Run `npm run dev`
    * Browser should open `localhost:8080`
