const express = require('express'); 
const workersController = require('./controllers/workerscontroller');
const coursesController = require('./controllers/coursescontroller');

const app = express();
app.use(workersController);
app.use(coursesController);

// Server start
 app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
})

