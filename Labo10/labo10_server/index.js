const express = require('express');
const bodyParser = require('body-parser');
const User = require('./user.js');
const Task = require('./task.js');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const db_port = process.env.DB_ENV || 27017;
const collection_name = process.env.COLLECTION_NAME || 'lab10';
mongoose.connect(`mongodb://localhost:${db_port}/${collection_name}`, {useNewUrlParser: true});
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send("TEST"));


app.post('/users', (req, res) => {
    const user = new User();
    user.save((error, createUser) => {
        if(error)
            return res.sendStatus(503);

        return res.status(201).send(JSON.stringify({id: createUser._id}))
    })
});

const userIdExists = userId => User.findById(userId, (error, user) => !(!!error || !user));

app.get('/:userId/tasks', (req, res) => {
    const {userId} = req.params;
    if(!userIdExists(userId))
        return res.status(404).send(JSON.stringify({error: `User id ${userId} does not exist`}));
    Task.find({userId}, (error, tasks) => {
        tasks = tasks || [];
        const tasksDTO = tasks.map(task => task.toDTO());
        return res.send(JSON.stringify({tasks: tasksDTO}));
    })
});

const taskIsValid = task => !!task && !!task.name && task.name !== '';

app.post('/:userId/tasks', (req, res) => {
    const { userId } = req.params;
    const task = req.body;

    if(!userIdExists(userId))
        return res.status(404).send(JSON.stringify({error: `User id ${userId} does not exist`}));
    if(!taskIsValid(task))
        return res.status(400).send(JSON.stringify({error: `Task ${task} is not valid`}));
    const newTask = new Task({name: task.name, userId});
    newTask.save((error, createdTask) => {
        if(!!error)
            return res.sendStatus(503);
        return res.status(201).send(JSON.stringify(createdTask.toDTO()))
    });
});

const taskIdExists = async taskId => {

    let exists = false;
    await Task.findById(taskId, function (error, task) {
        exists = !(!!error || !task)
    });
    return exists;
};

app.put('/:userId/tasks/:taskId', async (req, res) => {
    const { userId, taskId } = req.params;
    const {name: newName} = req.body;
    if(!userIdExists(userId))
        return res.status(404).send(JSON.stringify({error: `User id ${userId} does not exist`}));
    if(!(await taskIdExists(taskId)))
        return res.status(404).send(JSON.stringify({error: `Task id ${taskId} does not exist`}));

    Task.findById(taskId, (error, task) => {
        if(!!error)
            return res.sendStatus(503);
        task.name = newName;
        task.save((error, _task => {
            if(!!error)
                return res.sendStatus(503);
            console.log('updated task: ' + taskId);
            return res.status(200).send(JSON.stringify(task.toDTO()))
        }));
    })
});

app.delete('/:userId/tasks/:taskId', async (req, res) => {
    const {userId, taskId} = req.params;
    if (!userIdExists(userId))
        return res.status(404).send(JSON.stringify({error: `User id ${userId} does not exist`}));
    if (!(await taskIdExists(taskId)))
        return res.status(404).send(JSON.stringify({error: `Task id ${taskId} does not exist`}));

    Task.findOneAndRemove({_id: taskId}, (error, _) => {
        if (!!error)
            return res.sendStatus(503);
        console.log('Deleted task: ' + taskId);
        return res.sendStatus(204);
    });
});


app.listen(port, () => console.log(`Listening on port ${port}`));