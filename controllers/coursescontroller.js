const courses = require('../data/courses.json');
const express = require('express'); 
const coursesRouter=express.Router();

// Get course details by ID]
coursesRouter.get('/courses/:id', (req, res) => {
  const { id } = req.params;
  const course= courses.find((crs) => crs.id === parseInt(id));
  if(course)
  res.json(course);
else
res.json("not found");
});

// Get list of all courses

coursesRouter.get('/courses/', (req, res) => {
  res.json(courses);
});
module.exports=coursesRouter;