const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  title: String,
  description: String,
  publisher: String,
  bookType: {
    type: String,
    enum: ["ebook", "hardcopy"],
    default: "hardcopy",
  },
  stock: Number,
  language: String,
  printedOn: Date,
  authorName: String,
  //primary key and forieng key
  /*  author: {each book will be written by 1 guy 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  }, */
});

//create model
const Book = mongoose.model("Book", bookSchema);

module.exports = {
  //ADD NEW BOOK
  addNewBook: function (data, callback) {
    const book = new Book(data);
    book.save(function (error, result) {
      if (error) {
        console.error("Error Occured while adding new Book", error.message);
        return callback(error);
      }
      return callback(null, result);
    });
  },

  getAllBooks: function () {
    return new Promise((resolve, reject) => {
      Book.find(function (error, data) {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });
  },

  //IS BOOK AVAILABLE
  isBookAvailable: function (bookId, callback) {
    Book.findOne(bookId)
      .select("stock")
      .exec(function (error, result) {
        if (error) {
          return callback(error);
        }
        const availability = result.stock > 0 ? true : false;
        return callback(null, availability);
      });
  },

  //deleteBook
  deleteBook: function (bookId, callback) {
    Book.findByIdAndDelete(bookId, function (error, result) {
      if (error) {
        console.error("Error Occured while deleting a Book", error.message);
        return callback(error);
      }
      return callback(null, result);
    });
  },
};
