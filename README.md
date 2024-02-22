## NoSQL Social-Network-BackEnd API

https://github.com/Dev-Attaway/Social-Network-API/assets/145059598/c34b9ef0-26cb-4b90-a1de-3484a74b1a6a

## Description

  NoSQL Social-Network-BackEnd API operates as a bare-bones model of a social media site and as an educational skeleton. Modeling the MVC paradigm, excluding the view of MVC, and utilizing technologies such as
  Mongoose and Node: NoSQL Social-Network-BackEnd API seeks to establish an accessible skeleton for future projects relating to social media. As well as educate Junior devs on the mechanics
  of the back end and Mongoose databases. Furthermore, this project also demonstrates how Mongoose virtuals are implemented.
  
## Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Technology Used](#technology-used)
* [License](#license)
* [Contributing](#contributing)
* [Questions](#questions)
* [Directory](#directory)

## Installation

  To install the required dependencies, run the following command:
  > npm i
 
  To initialize the test data for the server, run the following command:
  > npm run seed

  To initialize the server run the following command:
  > npm run dev

## Usage

### Features

* Login/Logout Components
* Mongoose models for Thoughts, Users, and a schema for the Reaction
* CRUD routes for the Thoughts, Users, and Reactions
* Leave Reactions on created Thoughts
* Created Users can add other created Uers to their Friends list virtual schema property friendCount

### Functionality
* GIVEN a social network API
* WHEN I enter the command to invoke the application
* THEN my server is started and the Mongoose models are synced to the MongoDB database
* WHEN I open API GET routes in Insomnia for users and thoughts
* THEN the data for each of these routes is displayed in a formatted JSON
* WHEN I test API POST, PUT, and DELETE routes in Insomnia
* THEN I can successfully create, update, and delete users and thoughts in my database
* WHEN I test API POST and DELETE routes in Insomnia
* THEN I can successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Technology Used

* [Express](https://expressjs.com/)
* [mongoosejs](https://mongoosejs.com/)
* [mongoosejs](https://mongoosejs.com/)
* [Nodemon](https://nodemon.io/)
* [insomnia](https://insomnia.rest/)


## License

- [MIT](https://opensource.org/license/mit/)

## Contributing

  Please follow this link for best practices for contributing to an open-source project:
  <https://opensource.guide/how-to-contribute/>

## Questions

 If you have any questions or issues, please get in touch with me at <attaway.code@gmail.com>. You can also find more of my work at <https://github.com/Dev-attaway>.

 The source code for the NoSQL Social-Network-BackEnd API is organized within the following directories:

## Directory
* config/ - Contains configuration files for the application.
* controllers/ - Includes controller files responsible for handling business logic.
* models/ - Houses Mongoose models for Thoughts, Users, and other data entities.
* routes/ - Contains route files defining API endpoints and their corresponding handlers.
* utils/ - Provides utility functions and helper modules used throughout the application.
* index.js - The main entry point of the application where the server is initialized and routes are configured.
