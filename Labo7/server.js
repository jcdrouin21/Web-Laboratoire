const express = require('express');
const cors = require('cors');
const app = express();
const tasks = [];
let userId = "";

const corsOptions = {
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'UPDATE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world')
});

app.post('/tasks', (req, res) => {
  if(!req.body.name){
    res.status(400).send('La tâche ne peut pas être vide!!')
  }

  const task = {
    id: tasks.length + 1,
    name: req.body.name
  }
  tasks.push(task);
  res.send(task);
});

app.post('/', (req, res) => {
  userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  if(userId.length !== 36 || userId === ""){
    res.status(400).send("Identifiant utilisateur invalide");
  } else {
    res.status(200).send(userId);
  }
});

app.listen(3000, () => console.log('Écoute au port 3000'));
