# Calendar

A full stack calendar web app for event scheduling

- login/signup
- custom recurrence events
- view other user calendars

![Image of Calendar](https://github.com/xuanlc113/spring-calendar/blob/master/preview.PNG)

## Built with

- React
- Spring Boot
- PostgresQL
- Auth0

## Run Locally

- Clone the repo
- Create a local PostgresQL database
- in `api/src/main/resources/application.properties`, add created database info

```
spring.datasource.url=jdbc:postgresql://localhost:<database port>/<database name>
spring.datasource.username=<database username>
spring.datasource.password=<database password>

spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.properties.hibernate.jdbc.time_zone=UTC
```

- Create an Auth0 single page web app
- Update `.env` file in `/client`

```
REACT_APP_AUTH0_DOMAIN=<Auth0 Domain>
REACT_APP_AUTH0_CLIENTID=<Auth0 ClientID>
REACT_APP_API_URL=http://localhost:8080
REACT_APP_UUID_NAMESPACE=d2c82110-dabf-4858-bfee-fd9c13d19fdf
```

### Client

```
cd client
npm install
npm start
access at localhost:3000
```

### Server

```
cd api
./mvnw spring-boot:run
```
