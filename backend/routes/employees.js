const express = require('express');
const model = require("../models/Employee");
const mongoose = require('mongoose');
const { query, validationResult } = require('express-validator');
const router = express.Router();

// Landing page
//http://localhost:3000/api/v1/emp/
router.get('/', (req, res) => {
    res.send("<h1>Welcome from Employees</h1>");
});

// Return all employees
//http://localhost:3000/api/v1/emp/employees
router.get("/employees", async (req, res) => {
    console.log("Incoming request:", req.method, req.url);
    try{
        const employees = await model.find({});
        res.status(200).json({employees});
    }catch(e){
        console.log("DD")
        res.status(500).send(e)
    }
});

// Return employee with id 
//http://localhost:3000/api/v1/emp/employees/id
router.get("/employees/:id", query('id').notEmpty(), async (req, res) => {
    // Preform task
    try{
        const id = new mongoose.Types.ObjectId(req.params)
        // Find user
        const emp = await model.findOne({_id: id});

        // Return user if exists
        if(emp)
            res.status(201).json({emp});
        else
            res.status(401).json({message: "User not found"});
    }catch(e){
        res.status(500).send(e);
    }
});

// Create employee
/* 
{
  "first_name": "Alice",
  "last_name": "Johnson",
  "email": "alice.johnson@example.com",
  "position": "Designer",
  "salary": 85000,
  "date_of_joining": "2023-08-10T00:00:00.000Z",
  "department": "Design"
}
*/
//http://localhost:3000/api/v1/emp/employees
router.post("/employees", async (req, res) => {
    // Validate req.body not empty
    if(!validationResult(req.body).isEmpty()){
        res.status(401).json({
            message: 'Invalid attempt to create user'
        });
        return
    }

    // Do task
    try{        
        const email = req.body.email;
        // Does user with email already exist
        if(await model.findOne({email: email})){
            res.status(401).json(`User with email ${email} already exists.`);
            return
        }

        // Create new emp
        const newEmp = await new model({
            ...req.body,
            date_of_joining: Date.now(),
            created_at: Date.now()
        })

        // Save new emp 
        await newEmp.save();
        
        res.status(201).json(await model.findOne(newEmp));
    }catch(e){
        res.status(500).send(e);
    }
});

// Update employee with id
/*
{
 "position": "Developer",
 "salary": 100000
}
*/
//http://localhost:3000/api/v1/emp/employees/{id}
router.put("/employees/:id", query('id').notEmpty(), async (req, res) => {
    // Validate req.body
    if(!validationResult(req.body).isEmpty()){
        res.status(401).json({
            message: 'Nothing to update'
        });
        return
    }

    // Complete task 
    try{
        const id = new mongoose.Types.ObjectId(req.params) 
        // Check if user exists 
        if(await model.findById({_id: id}) == null){
            res.status(401).json({
                message: `User with id: ${id} not found`
            });
            return
        }

        // Update user 
        await model.findByIdAndUpdate({_id: id}, {$set : req.body, updated_at: Date.now()});

        res.status(201).json({
            message: "Employee details updated successfully."
        });
    }catch(e){
        res.status(500).send(e);
    }
});

// Delete employee with id
//http://localhost:3000/api/v1/emp/employees?id=
router.delete("/employees/:id", query('id').notEmpty(), async (req, res) => {
    try{
        const id = new mongoose.Types.ObjectId(req.params)

        // Delete emp
        await model.findByIdAndDelete({_id: id});

        res.status(201).json({
            message: "Employee deleted successfully."
        })
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;