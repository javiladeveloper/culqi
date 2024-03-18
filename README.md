# TypeScript Node.js Project with EKS Deployment

## Local Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file and add necessary environment variables (e.g., PORT, JWT_SECRET).
4. Compile TypeScript code with `npm run build`.
5. Start the server with `npm start`.
6. localhost:3000 on local

## Commands

- `npm run build`: Compile TypeScript code.
- `npm run start`: Start the server in production mode.
- `npm test`: Run tests.
- `npm run dev`: Start the server in development mode with nodemon.

## API Endpoints

- `POST /api/token`: Create a token (body: card_number, cvv, expiration_month, expiration_year, email).
- `GET /api/card/:token`: Get card data by token.

## Docker

- `docker build -t reto-culqi .`:create images.
- `docker-compose build`: upload images.
- `docker-compose up -d`: up container.
- `localhost:4001`: to work on docker

## Deployment

1. ECR URI: aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 767398124234.dkr.ecr.us-east-1.amazonaws.com/culqi-challenge
2. tag: docker tag reto-culqi:latest 767398124234.dkr.ecr.us-east-1.amazonaws.com/culqi-challenge:latest
3. push on AWS ECR: docker push 767398124234.dkr.ecr.us-east-1.amazonaws.com/culqi-challenge
4. create EKS
5. create group nodes
6. create .kube config : aws eks --region us-east-1 update-kubeconfig --name reto-culqi
7. kubectl create -f deployment.yml
8. kubectl create -f serviceNodePort.yml
