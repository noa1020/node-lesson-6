const courses = require('../data/courses.json');
const express = require('express');
const coursesRouter = express.Router();
const fsPromises = require('fs').promises;


//Add course
coursesRouter.post('/', async (req, res) => {
  let data = req.body;
  courses.push(data);
  try {
      await fsPromises.writeFile('./data/courses.json', JSON.stringify(courses))
      res.send('The new course: ' + JSON.stringify(data));
  }
  catch (err) {
      console.error(err);
  }
});

//Update course
coursesRouter.put('/', async (req, res) => {
  let data = req.body;
  const courseIndex = courses.findIndex(course => course.id === data.id);
  if (courseIndex !== -1) {
      const description = req.body.description;
      if (description)
      courses[courseIndex].description = description;
      try {
          await fsPromises.writeFile('./data/courses.json', JSON.stringify(courses))
          res.send('Succeeded, the updated course: ' + JSON.stringify(courses[courseIndex]));
      }
      catch (err) {
          console.error(err);
      }
  }
  else
  res.status(404).json({ error: "Course not found" });
});

//delete course
coursesRouter.delete('/', async (req, res) => {
  const courseIndex = courses.findIndex(course => course.id === req.body.id);
  if (courseIndex !== -1) {
    courses.splice(courseIndex, 1);
      try {
          await fsPromises.writeFile('./data/courses.json', JSON.stringify(courses))
          res.send('Succeeded');
      }
      catch (err) {
          console.error(err);
      }
  }
  else
      res.status(404).json({ error: "Course not found" });

});



// Get course details by ID
coursesRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const course = courses.find((crs) => crs.id === parseInt(id));
  if (course)
    res.json(course);
  else
  res.status(404).json({ error: "Course not found" });
});


// Get list of all courses
coursesRouter.get('/', (req, res) => {
  if (courses.length > 0)
    res.json(courses);
  else
    res.status(404).json({ error: "No courses found" });
});


module.exports = coursesRouter;