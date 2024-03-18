# TypeScript Node.js Project with EKS Deployment

## Local Setup

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Create a `.env` file and add necessary environment variables (e.g., PORT, JWT_SECRET).
4. Compile TypeScript code with `npm run build`.
5. Start the server with `npm start`.

## Commands

- `npm run start`: Start the server in production mode.
- `npm run build`: Compile TypeScript code.
- `npm test`: Run tests.
- `npm run dev`: Start the server in development mode with nodemon.

## API Endpoints

- `POST /api/token`: Create a token (body: card_number, cvv, expiration_month, expiration_year, email).
- `GET /api/card/:token`: Get card data by token.

## Deployment

Deploy the application to AWS EKS following AWS EKS deployment guidelines.
