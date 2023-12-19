const employees = require('../data/workers.json');
const express = require('express');
const workersRouter = express.Router();

const fsPromises = require('fs').promises;

//Add worker
workersRouter.post('/', async (req, res) => {
    let data = req.body;
    employees.push(data);
    try {
        await fsPromises.writeFile('./data/workers.json', JSON.stringify(employees))
        res.send('The new worker: ' + JSON.stringify(data));
    }
    catch (err) {
        console.error(err);
    }
});

//Update worker
workersRouter.put('/', async (req, res) => {
    let data = req.body;
    const workerIndex = employees.findIndex(worker => worker.id === data.id);
    if (workerIndex !== -1) {
        const name = req.body.name;
        const telephone = req.body.telephone;
        const email = req.body.email;
        const position = req.body.position;
        const department = req.body.telephone;
        const start_of_work_date = req.body.start_of_work_date;
        if (name)
            employees[workerIndex].name = name;
        if (telephone)
            employees[workerIndex].telephone = telephone;
        if (email)
            employees[workerIndex].email = email;
        if (position)
            employees[workerIndex].position = position;
        if (department)
            employees[workerIndex].department = department;
        if (start_of_work_date)
            employees[workerIndex].start_of_work_date = start_of_work_date;
        try {
            await fsPromises.writeFile('./data/workers.json', JSON.stringify(employees))
            res.send('Succeeded, the updated worker: ' + JSON.stringify(employees[workerIndex]));
        }
        catch (err) {
            console.error(err);
        }
    }
    else
        res.status(404).json({ error: "Employee not found" });
});

//delete worker
workersRouter.delete('/', async (req, res) => {
    const workerIndex = employees.findIndex(worker => worker.id === req.body.id);
    if (workerIndex !== -1) {

        employees.splice(workerIndex, 1);
        try {
            await fsPromises.writeFile('./data/workers.json', JSON.stringify(employees))
            res.send('Succeeded');
        }
        catch (err) {
            console.error(err);
        }
    }
    else
        res.status(404).json({ error: "Employee not found" });

});


// Get employee details by ID
workersRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    const employee = employees.find((emp) => emp.id === parseInt(id));
    if (employee)
        res.json(employee);
    else
        res.status(404).json({ error: "Employee not found" });

});

// Get list of all employees with optional filters
workersRouter.get('/', (req, res) => {
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