const employees = require('../data/workers.json');
const express = require('express');
const workersRouter = express.Router();

// Get employee details by ID
workersRouter.get('/workers/:id', (req, res) => {
    const { id } = req.params;
    const employee = employees.find((emp) => emp.id === parseInt(id));
    if (employee)
        res.json(employee);
    else
        res.status(404).json({ error: "Employee not found" });

});

// Get list of all employees with optional filters
workersRouter.get('/workers', (req, res) => {
    const position = req.query.position ? req.query.position : null;
    const department = req.query.department ? req.query.department.toLowerCase() : null;
    const start_of_work_date = req.query.start_of_work_date ? req.query.start_of_work_date.toLowerCase() : null;
    let workers_result = employees;
    if (position) {
        workers_result = workers_result.filter(worker => worker.position.toLowerCase().includes(position));
    }
    if (department) {
        workers_result = workers_result.filter(worker => worker.department.toLowerCase().includes(department));
    }
    if (start_of_work_date) {
        workers_result = workers_result.filter(worker => worker.start_of_work_date.toLowerCase().includes(start_of_work_date));
    }
    if (workers_result.length > 0)
        res.json(workers_result);
    else
        res.status(404).json({ error: "No employees found" });

});
  

module.exports = workersRouter;