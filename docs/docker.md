## Building

Building application
`npm run build`  
You can build docker with following command: `docker build -t account-it-api:latest .`

## Running

Running container `docker run -p 4000:4000 -e NODE_ENV=production account-it-api:latest`
