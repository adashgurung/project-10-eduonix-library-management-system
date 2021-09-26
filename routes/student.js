var express = require("express");

const {
  addNewStudent,
  getAllStudent,
  getStudentByEmail,
  editStudent,
  deleteStudent,
} = require("../models/Students");

//const Student = require("../model/Students");

var router = express.Router();

//POST USUALLY req.body pass in body
//ADD STUDENT
router.post("/addStudent", function (req, res) {
  addNewStudent(req.body, function (error, result) {
    if (error) {
      res.status(400).send({
        success: false,
        message: error.message,
      });
      return;
    }
    res.status(200).send({
      success: true,
      message: "Added New Student to the DB!!",
      data: result,
    });
  });
});

//get all students
router.get("/all-students", async function (req, res) {
  try {
    const data = await getAllStudent();
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

//get student details by email
router.get("/:email", async function (req, res) {
  try {
    const { email } = req.params;
    const data = await Student.getStudentByEmail(email);
    res.send({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Cannot fetch student details",
      data: null,
    });
  }
});

//UPDATE STUDENT INFO
router.put("/update-student", async function (req, res) {
  try {
    const data = await editStudent(req.body.studentId, req.body);
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

router.delete("/delete-student", async function (req, res) {
  try {
    const data = await deleteStudent(req.body.studentId, req.body);
    res.send({
      success: true,
      data,
      message: "sudent has been deleted",
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

module.exports = router;

//get student gender by ID
/* router.put("/:gender/:studentId", async function (req, res) {
  try {
    const { studentId, gender } = req.params;
    const data = await updateStudentGender(studentId, gender);
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
}); */
