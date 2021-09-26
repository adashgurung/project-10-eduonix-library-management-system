var express = require("express");

const { addNewBook, deleteBook, getAllBooks } = require("../models/Book");

var router = express.Router();

//ADD NEW BOOK
router.post("/addBook", function (req, res) {
  addNewBook(req.body, function (error, result) {
    if (error) {
      res.status(400).send({
        success: false,
        message: "A Book cannot be added",
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: "New Book has been added!",
      data: result,
    });
  });
});

router.get("/all-books", async function (req, res) {
  try {
    const data = await getAllBooks();
    res.send({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

//DELETE BOOK not working
router.get("/allBooks/:bookId", function (req, res) {
  deleteBook(req.params.bookId),
    function (error, result) {
      if (error) {
        res.status(500).send({
          success: false,
          message: "Book cannot be deleted",
        });
        return;
      }
      res.status(200).send({
        success: true,
        message: "This Book has been deleted successfully",
        data: result,
      });
    };
});

module.exports = router;
