This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

Link to hosted version - https://nc-news-rdca.onrender.com/api

An API that allows users to make requests to retrieve data on articles, such as comments and users, click link above for example requests.

To create and run tests for a local copy -

1. Clone the repository

   - Open terminal
   - Change the current working directory to the location where you want the cloned directory
   - Type 'git clone https://github.com/dot-jayson/nc-news.git' and hit enter

2. Initial setup

   - cd into repository and open with VSCode
   - npm install to install dependencies
   - Make sure PostgreSQL is running
   - npm run setup-dbs to set up database
   - npm run seed to seed local database

3. Create .env files

   - Create an .env.test file in the root directory and include PGDATABASE=nc_news_test
   - Create an .env.development file in the root directory and include PGDATABASE=nc_news

4. Testing
   - npm test app to seed test database and run tests

Minimum version of Node.js v22.6.0
Minumum version of Postgres v14.13
