const express = require("express");
const MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
const assert = require('assert');
const app = express();

// Connection URL
const url = "mongodb://mongodb:27017";

// Database Name
const dbName = 'student_db';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
let DB;
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    DB = client.db(dbName);
});

app.use(express.json());
////////////////////////////////////////////////////////////////////
// Endpoint : /cms/students
// Fetch students for front end app
////////////////////////////////////////////////////////////////////
app.get("/students", (req, res) => {
    
    let students = DB.collection("students");

    students.find().toArray((err, items) => {
        if (err) {
          console.error(err)
          res.status(500).json({ err: err })
          return
        }
        res.status(200).json({ status: "success", message: `Students list retrieved successfully`, data: items })
    });

});

////////////////////////////////////////////////////////////////////
// Endpoint : /cms/student
// Add new student
////////////////////////////////////////////////////////////////////
app.post("/cms/student", (req, res) => {
    const name = req.body.name
    let students = DB.collection("students");
    students.insertOne({ name: req.body.name, country: req.body.country, course: req.body.course }, (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      console.log(result)
      res.status(200).json({ status: "success" , message: `Student with name ${name} added successfully`});
    })
})

////////////////////////////////////////////////////////////////////
// Endpoint : /cms/students
// Fetch students for front end app
////////////////////////////////////////////////////////////////////
app.get("/cms/students", (req, res) => {
    
    let students = DB.collection("students");

    students.find().toArray((err, items) => {
        if (err) {
          console.error(err)
          res.status(500).json({ err: err })
          return
        }
        res.status(200).json({ status: "success", message: `Students list retrieved successfully`, data: items })
    });

});

////////////////////////////////////////////////////////////////////
// Endpoint : /cms/students/:id/update
// Update students for front end app
////////////////////////////////////////////////////////////////////
app.put("/cms/students/:id/update", (req, res) => {

    let students = DB.collection("students");
    const _id = new ObjectID(req.params.id);
    students.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            name: req.body.name,
            country: req.body.country,
            course: req.body.course
          }
        },
        {
          upsert: true
        }
      )
        .then(result => {
            res.status(200).json({ status: "success", message: `Student updated successfully`, data: result })
        })
        .catch(error => {
            console.error(error)
            res.status(500).json({ err: error })
        });
    
});


////////////////////////////////////////////////////////////////////
// Endpoint : /cms/students/:id/delete 
// Delete students for front end app
////////////////////////////////////////////////////////////////////
app.delete("/cms/students/:id/delete", (req, res) => {
    let students = DB.collection("students");
    const _id = new ObjectID(req.params.id);
    students.deleteOne( { "_id":  _id}, function(err, result){
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ status: "success", message: `Student deleted successfully`, data: result })
    });
});


app.listen(3006, () => console.log("Server ready"))