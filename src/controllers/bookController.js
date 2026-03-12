const Book = require("../models/Book");

const createBook = async (req, res, next) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const getBooks = async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const searchBooks = async (req, res, next) => {
  try {
    const { title, author } = req.query;

    if (!title && !author) {
      return res.status(400).json({
        success: false,
        message: "Search query requires title or author",
      });
    }

    const orConditions = [];

    if (title) {
      orConditions.push({ title: { $regex: title, $options: "i" } });
    }

    if (author) {
      orConditions.push({ author: { $regex: author, $options: "i" } });
    }

    const books = await Book.find({
      $or: orConditions,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
};
