![](https://dl.dropboxusercontent.com/s/lwsewhpqj6wv06r/banner-128-raleway.png?dl=0)
---
# dotBind [![Travis-Ci Build Status](https://travis-ci.org/deluxe-pug/dotBind.svg?branch=dev)](https://travis-ci.org/deluxe-pug/dotBind)
DotBind is a software engineer's notebook. Capture cool code snippets while browsing the web or track solutions to bugs. Never forget code again.

Check out the web app @ [dotbind.io](http://dotbind.io).

[Download the chrome extension](https://chrome.google.com/webstore/detail/save-to-dotbind/hgagliimejgbhlgadoibbmlinaidfmgo?hl=en-US&gl=US&authuser=1)

## Table of Contents 
- [Team Members](#team-members-v-10)
- [Technology Stack, APIs, and Third-party Tools](#technology-stack-apis-and-third-party-tools)
- [Folder and File Structure](#folder-and-file-structure)
- [Setting up your development environment](#setting-up-your-development-environment)
- [Starting up for development](#starting-up-for-development)
- [System Architecture](#system-architecture)
- [Database Schema](#database-schema)
- [API Endpoints](#api)

## Team Members (v. 1.0)

[![Michelle He](https://dl.dropbox.com/s/u38k1c4csex03o2/michelle.png?dl=0)](https://github.com/michelleheh)

[![Liam Hatcher](https://dl.dropboxusercontent.com/s/n92n81dm90q4nrp/liam.png?dl=0)](https://github.com/lhatcher)

[![Connie Cheung](https://dl.dropboxusercontent.com/s/m3z08dtqxlpb69o/connie.png?dl=0)](https://github.com/conniedaisy)

[![Kevin Nguyen](https://dl.dropboxusercontent.com/s/wyebxbavnc7ihk7/kevinwin.png?dl=0)](https://github.com/kevinwin)
## Technology Stack, APIs, and Third-party Tools
- [React](https://facebook.github.io/react/) for rendering views and [Redux](https://github.com/reactjs/redux) for managing state
- [Node.js](https://nodejs.org/en/) and [Express](http://expressjs.com/)
- [Passport](http://passportjs.org/) and [Github Oauth](https://developer.github.com/v3/oauth/)
- [Nodal](http://www.nodaljs.com/) & [Postgres](http://www.postgresql.org/) for creating a RESTful API
- [Amazon Web Services](https://aws.amazon.com/) for deployment
- [ElasticSearch](https://www.elastic.co/)
- [Ace Editor](https://ace.c9.io/#nav=about)
- Github's [Octodex](https://octodex.github.com/)
- [Travis CI](https://travis-ci.org/), [Mocha](https://mochajs.org/), and [Chai](http://chaijs.com/) for TDD
- [Webpack](https://webpack.github.io/) & [Babel](https://babeljs.io/) for using next-generation JavaScript, today 
- [AirBnb's style guide](https://github.com/airbnb/javascript)

## Folder and File Structure
```
                                  +-------+
                                  |dotBind|
                                  +---+---+
                                      |
           +--------------------------+------------------------+
           |                                                   |
           v                                                   v
        +--+---+                                            +--+---+
        |client|                                            |server|
        +--+---+                                            +--+---+
           |                                                   |
      +----+-----+                                        +----+-----+
      |          |                                        |          |
      v          v                                        v          v
    +-+-+     +--+---+                                 +--+---+    +-+-+
    |app|     |chrome|                                 |static|    |api|
    +-+-+     +------+                                 +--+---+    +-+-+
      |                                                   |          |
      v                                                   v          v
+-----+-----+                                      +------+-----+  +-+---+
|Redux/React|                                      |Node/Express|  |Nodal|
+-----------+                                      +------------+  +-----+
```
The repo is divided into 2 main folders, `client` and `server`.
Each main folder is divided into respective subfolders.

`app` is the container for the Redux/React web app

`chrome` holds the html/cs/js and configuration files needed to build the chrome extension.

`static` represents a static file server which serves up files inside `app`.

`api` is the container for the RESTful API server.
## Setting up your development environment
1. Install dependencies in client/app, server/static, and server/api directories
```
$ npm install
```
2. Install Nodal
```
$ npm install nodal -g
```
3. Install PostgreSQL
3. Install ElasticSearch
```
$ brew update
$ brew install elasticsearch
// you will need java 1.7+ to run ElasticSearch (brew install Caskroom/cask/java)
```
5. In your Google Chrome browser, go to chrome://extensions, click on 'Developer mode' then 'Load unpacked extension', select the client/chrome folder to run extension in developer mode

## Starting up for development
1. Run ElasticSearch
```
$ elasticsearch
```
2. Run Postgres App
3. Run static-file server from server/static directory
```
$ npm start
```
4. Run API server from server/api diretory
```
$ nodal db:create // create database
$ nodal db:prepare // wipes database
$ nodal db:migrate // runs progressive command to rebuild tables in database
$ nodal db:seed // seeds database with dummy data
$ nodal s // start server
```
5. Run Webpack watch and build from client/app directory
```
$ npm run build
```
6. Go to http://localhost:8000

## System Architecture
![Architecture](https://dl.dropboxusercontent.com/s/pu2ahvx2269eyaf/architecture.png?dl=0)

## Database Schema
![Schema](https://dl.dropboxusercontent.com/s/wjzzu912skwqy1s/schema.png?dl=0)

## API
For API Documentation, please see the [ENDPOINTS.md](ENDPOINTS.md) file
## License
MIT
