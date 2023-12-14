const express = require('express'); 
const workersController = require('./controllers/workerscontroller');
const coursesController = require('./controllers/coursescontroller');

const app = express();
app.use(coursesController);
app.use(workersController);

// Server start
 app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
})

app.use((req, res, next) => {
    res.status(404).send('You have an error: Page not found');
  });    
  
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err); // Log the error to the console
    res.status(500).json({ error: "An error occurred on the server. Please try again later." });
  });
  
