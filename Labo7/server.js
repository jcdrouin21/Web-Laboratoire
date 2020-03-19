const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world')
});

app.post('/tasks', (req, res) => {
  if(!req.body.name){
    res.status(400).send('La tâche ne peut pas être vide!!')
  }

  const task = {
    id: tasks.lenght + 1,
    name: req.body.name
  }
  tasks.push(task);
  res.send(task);
});

app.listen(3000, () => console.log('Écoute au port 3000'));
