# Library Backend API

Backend API for library book record management using Node.js, Express, MongoDB, Mongoose, and dotenv.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Update `.env`:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
4. Test the API:
   ```text
   http://localhost:4000/api/health
   ```

`MONGO_URI` is required. The server exits at startup if MongoDB is not configured or the connection fails.

## API Endpoints

- `GET /api/health` - health check
- `POST /api/books` - add a new book
- `GET /api/books` - get all books
- `GET /api/books/:id` - get book by MongoDB document id
- `PUT /api/books/:id` - update book details
- `DELETE /api/books/:id` - delete a book
- `GET /api/books/search?title=xyz` - search by title
- `GET /api/books/search?author=xyz` - search by author

## Book Fields

- `bookId` - auto-generated unique id
- `title` - required
- `author` - required
- `isbn` - required and unique
- `genre` - required
- `publisher` - required
- `publicationYear` - required valid year
- `totalCopies` - required positive number
- `availableCopies` - required, non-negative, cannot exceed total copies
- `shelfLocation` - required
- `bookType` - `Reference` or `Circulating`
- `status` - `Available` or `Checked Out`, defaults to `Available`
