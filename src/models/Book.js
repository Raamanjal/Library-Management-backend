const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    publisher: {
      type: String,
      required: [true, "Publisher is required"],
      trim: true,
    },
    publicationYear: {
      type: Number,
      required: [true, "Publication year is required"],
      min: [1000, "Publication year must be valid"],
      max: [new Date().getFullYear(), "Publication year cannot be in the future"],
    },
    totalCopies: {
      type: Number,
      required: [true, "Total copies is required"],
      min: [1, "Total copies must be a positive number"],
    },
    availableCopies: {
      type: Number,
      required: [true, "Available copies is required"],
      min: [0, "Available copies cannot be negative"],
      validate: {
        validator(value) {
          return value <= this.totalCopies;
        },
        message: "Available copies cannot exceed total copies",
      },
    },
    shelfLocation: {
      type: String,
      required: [true, "Shelf location is required"],
      trim: true,
    },
    bookType: {
      type: String,
      enum: ["Reference", "Circulating"],
      default: "Circulating",
    },
    status: {
      type: String,
      enum: ["Available", "Checked Out"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

bookSchema.pre("validate", function generateBookId() {
  if (!this.bookId) {
    const stamp = Date.now().toString().slice(-6);
    const random = Math.floor(100 + Math.random() * 900);
    this.bookId = `BOOK-${stamp}${random}`;
  }
});

module.exports = mongoose.model("Book", bookSchema);
