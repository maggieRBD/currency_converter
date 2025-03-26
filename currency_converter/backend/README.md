# Backend

This project is a Node.js backend application that serves as a custom API for a currency converter. It is designed to interact with a frontend application, providing endpoints for currency conversion and exchange rate retrieval.


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