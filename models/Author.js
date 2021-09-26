const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema({
  firstName: String,
  lastName: String,
  // foreign key
  books: [
    //array of books
    //auther can write many books.
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

//HELPER functions interact DB layer.
//creating models
const Author = mongoose.model("Author", authorSchema);

//HELPER METHOd ADD new Author
const addNewAuthor = function (data, callback) {
  const author = new Author({
    ...data,
  });

  author.save(function (error, result) {
    if (error) {
      console.error("Error Occured while creating new Author", error.message);
      return callback(error);
    }
    return callback(null, result);
    //return callback (pass null instead of error and result itself)
  });
};

//55:51
//HELPER METHOd GET ALL BOOKS BY AUTHOR
const getAllBooksWrittenByAuthor = function (authorId, callback) {
  Author.findById(authorId)
    .populate("books") //REQUEST FOR REFERENCE OBJECT 'books'
    .exec(function (error, result) {
      if (error) {
        console.error(
          "Error Occured while fetching Author's Book",
          error.message
        );
        return callback(error);
      }
      return callback(null, result);
    });
};

//try to find the best solution to update the books??????
const addNewBookToAuthor = function (bookId, authorId, callback) {
  Author.findByIdAndUpdate(authorId, { books: bookId }, function (error, data) {
    if (error) {
      return callback(error);
    }
    return callback(null, data);
  });
};

module.exports = {
  addNewAuthor: addNewAuthor, //this
  getAllBooksWrittenByAuthor, //or this
  addNewBookToAuthor,
};
