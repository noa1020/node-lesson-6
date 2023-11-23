const express = require('express'); 
const workersController = require('./controllers/workerscontroller');
const coursesController = require('./controllers/coursescontroller');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Workers routes
app.get('/workers/:id', workersController.getEmployeeDetails);
app.get('/workers', workersController.getAllEmployees);

// Courses routes
app.get('/courses/:id', coursesController.getCourseDetails);
app.get('/courses', coursesController.getAllCourses);

// Server start
 app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
})

