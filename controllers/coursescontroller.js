const courses = require('../data/courses.json');
const express = require('express');
const coursesRouter = express.Router();

// Get course details by ID
coursesRouter.get('/courses/:id', (req, res) => {
  const { id } = req.params;
  const course = courses.find((crs) => crs.id === parseInt(id));
  if (course)
    res.json(course);
  else
    res.status(404).json({ error: "Course not found" });
});


// Get list of all courses
coursesRouter.get('/courses', (req, res) => {
  if (courses.length > 0)
    res.json(courses);
  else
    res.status(404).json({ error: "No courses found" });
});


module.exports = coursesRouter;