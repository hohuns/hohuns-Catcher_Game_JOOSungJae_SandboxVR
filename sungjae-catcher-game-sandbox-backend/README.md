# Catcher Game - backend

Done by JOO SUNGJAE HANS (hohunsjoo11177@gamil.com)

## Libraries

### Backend

Express.js, mongoose, nodemon, swagger-ui, helmet, dotenv, morgan

## Installation

```bash
npm install
```

## API documentation (Swagger UI)

![Swagger](https://github.com/hohuns/Catcher_Game_JOOSungJae_SandboxVR/assets/47592940/c9b9872a-a820-4fb6-8c8a-c4e34ee81d8c)
You can check all api's and details in this swagger UI page.

```bash
http://localhost:8800/api-docs/
```

## Database connection or other configuration

You have to create local 'config.env' inside the root forder of backend source code. And put your mongodb connection url.

```bash
NODE_ENV=development
PORT=8800
DATABASE=YOUR_MONGOBD_CONNECTION_URL

```

## Start Project

You can type below command to start server.

```bash
npm run start-dev
```

If you successfully connected with db then you will see below console message.

```bash
App running on port: 8800
DB Connected
```
