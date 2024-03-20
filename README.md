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
- `npm test`: Run tests.

## Docker

- `docker build -t reto-culqi .`: Create the Docker image.
- `docker-compose build`: Build the services defined in your docker-compose.yml file.
- `docker-compose up -d`: Start the Docker containers in detached mode.
- `localhost:4001`: Access your application on Docker at this address.

## API Endpoints

- `POST /api/token`: Create a token (body: card_number, cvv, expiration_month, expiration_year, email).
- `GET /api/card/:token`: Get card data by token.

## Deployment

1. ECR URI: aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 767398124234.dkr.ecr.us-east-1.amazonaws.com/culqi-challenge
2. tag: docker tag reto-culqi:latest 767398124234.dkr.ecr.us-east-1.amazonaws.com/culqi-challenge:latest
3. push on AWS ECR: docker push 767398124234.dkr.ecr.us-east-1.amazonaws.com/culqi-challenge
4. create EKS
5. create group nodes
6. create .kube config : aws eks --region us-east-1 update-kubeconfig --name reto-culqi
7. kubectl create -f deployment.yml
8. kubectl create -f serviceNodePort.yml
