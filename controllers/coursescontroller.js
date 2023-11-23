const courses = require('../data/courses.json');

// Get course details by ID
exports.getCourseDetails = (req, res) => {
  const { id } = req.params;
  const course= courses.find((crs) => crs.id === parseInt(id));
  if(course)
  res.json(course);
else
res.json("not found");
};

// Get list of all courses
exports.getAllCourses = (req, res) => {
  res.json(courses);
};
