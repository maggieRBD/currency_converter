# Custom API Backend

This project is a Node.js backend application that serves as a custom API for a currency converter. It is designed to interact with a frontend application, providing endpoints for currency conversion and exchange rate retrieval.

## Project Structure

```
custom-api-backend
├── src
│   ├── app.js               # Entry point of the application
│   ├── routes               # Contains route definitions
│   │   └── index.js         # API route setup
│   ├── controllers          # Business logic for each route
│   │   └── index.js         # Controller functions
│   ├── services             # Logic for interacting with external APIs or databases
│   │   └── index.js         # Service functions
│   ├── models               # Data models for the application
│   │   └── index.js         # Model definitions
│   └── config               # Configuration files
│       └── env.js           # Environment variable loader
├── package.json              # NPM configuration file
├── .env                      # Environment variables
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd custom-api-backend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Create a `.env` file:**
   Copy the `.env.example` to `.env` and fill in the required environment variables.

4. **Run the application:**
   ```
   npm start
   ```

## Usage

The API provides the following endpoints:

- `GET /api/exchange-rate`: Retrieves the current exchange rate between currencies.
- `POST /api/convert`: Converts a specified amount from one currency to another.

## License

This project is licensed under the MIT License.