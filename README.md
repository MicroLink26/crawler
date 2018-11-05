# crawler

A nodejs crawler + vuejs front

## Prerequisite

- Having an accessible mongoDB instance
- Git
- Node 10.13.0
- Npm 6.4.1

## Quickstart

Clone this repo : git clone https://github.com/MicroLink26/crawler.git

### Backend

- open a terminal and go to directory crawler
```
cd backend
```
- Update   dbServer, dbusername ,dbpassword ,targetsite ,hostname  in [configuration file](backend/config/config.js)
- install NPM packages : 
```
npm install
```
- start api : 
```
npm run start
```
-run test
```
npm test
```

#### Environements

- NODE_ENV=dev for development
- NODE_ENV=uat for acceptence testing plateforme
- NODE_ENV=production for production

#### Refresh database (with wget)

- refresh trending : wget {server:port}/api/V1/products/refresh/trending
- refresh best-selling : wget {server:port}/api/V1/products/refresh/best-selling

#### Test
```
npm test
```

### Frontend

- open a terminal and go to directory crawler
- cd frontend

#### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Run your tests
```
npm run test
```

#### Lints and fixes files
```
npm run lint
```