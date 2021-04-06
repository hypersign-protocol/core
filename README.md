## APIs

`/did http://127.0.0.1:5000/api/v1/did/`

Supported Methods: `GET`, `POST`


`/schema http://127.0.0.1:5000/api/v1/schema/`

Supported Methods: `GET`, `POST`


## Install and usage

Install dependencies
```bash
npm i 
```

Development

```bash
npm run dev 
```

```
npm run build:dev
npm run start  
```

Production

```bash
npm run build:prod 
npm run prod #production
```
Note: Create `production.env` for production run

### Dockerization

Build docker image
```
npm run build:prod
docker build -t ts-boilerplate .  # build an image
```

Run container
```
docker run -p 5000:5000 -d ts-boilerplate
```
Note: Create `production.env` for production run
