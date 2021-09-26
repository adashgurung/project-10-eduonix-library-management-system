const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: String,
  authorized: Boolean,
  gender: {
    type: String,
    enum: ["MALE", "FEMALE", "OTHER"],
  },
  //foreign key
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

studentSchema.methods.findByEmail = function (email) {
  return new Promise((resolve, reject) => {
    Student.findOne({ email }, function (error, data) {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
};

//MODELS
const Student = mongoose.model("Student", studentSchema);

module.exports = {
  //GET ALL STUDENTS
  getAllStudent: function () {
    return new Promise((resolve, reject) => {
      Student.find(function (error, data) {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });
  },

  //ADD NEW STUDENT
  addNewStudent: function (data, callback) {
    const student = new Student(data);
    student.save(function (error, result) {
      if (error) {
        console.error(
          "Error Occured while creating new Student",
          error.message
        );
        return callback(error);
      }
      return callback(null, result);
      //return callback (pass null instead of error and result itself)
    });
  },

  //getStudentDetailsByEmail
  getStudentByEmail: async function (email) {
    try {
      const studentDetails = await studentSchema.methods.findByEmail(email);
      return Promise.resolve(studentDetails);
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  },

  editStudent: function (id, studentData) {
    return new Promise((resolve, reject) => {
      Student.findOneAndUpdate(
        { id },
        { ...studentData },
        function (error, data) {
          if (error) {
            return reject(error);
          }
          return resolve(data);
        }
      );
    });
  },

  deleteStudent: function (id, studentData) {
    return new Promise((resolve, reject) => {
      Student.findOneAndDelete(
        { id },
        { ...studentData },
        function (error, data) {
          if (error) {
            return reject(error);
          }
          return resolve(data);
        }
      );
    });
  },

  /*   //UPDATE STUDENT GENDER ONLY
  updateStudentGender: function (id, gender) {
    return new Promise(function (resolve, reject) {
      Student.findByIdAndUpdate(id, { gender }, function (error, data) {
        if (error) {
          return reject(error);
        }
        return resolve(data);
      });
    });
  }, */
};
