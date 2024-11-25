const express = require('express')
const mongoose = require('mongoose');
const Task = require('./models/task.model.js');
const taskRoute = require('./routes/task.route.js');
const app = express()

//Middleware
app.use(express.json());

//Routes
app.use("api/task", taskRoute);

//--------- Server
app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
});

//--------- Post/Create Tarefas
app.post('/api/tasks', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//--------- Get/Read Tarefas

//Ler todas tarefas

app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Filtrar tarefa por título ou categoria

app.get('/api/task', async (req, res) => {
    try {
        const { titulo, categoria } = req.query;
        let filter = {};

        if (titulo) {
            filter.titulo = titulo;
        }

        if (categoria) {
            filter.categoria = categoria;
        }

        const task = await Task.find(filter);

        if (task.length === 0) {
            return res.status(404).json({ message: "Nenhuma tarefa encontrada com este filtro" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Filtrar tarefa por categoria

app.get('/api/task/categoria/:categoria', async (req, res) => {
    try {
        const { categoria } = req.params;
        const task = await Task.find({ categoria: categoria });

        if (task.length === 0) {
            return res.status(404).json({ message: "Nenhuma tarefa encontrada para esta categoria" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//--------- Update Tarefas

app.put('/api/task/:id', async (req, res) => {
    try {
        
        const{ id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);

        if (!task) {
            return res.status(404).json({ message: "Tarefa não encontrada"});
        }

        const updatedTask = await Task.findById(id);
        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//--------- Delete Tarefas


app.delete('/api/task/:id', async (req, res) => {
    try {
        const{ id } = req.params;
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ message: "Tarefa não encontrada"});
        }

        return res.status(200).json({ message: "Tarefa deletada com sucesso"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
});



mongoose.connect("mongodb+srv://alinemdev:pmDxhv38CoRna84j@taskscluster.a2ugx.mongodb.net/Tasks-App?retryWrites=true&w=majority&appName=TasksCluster")
.then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    });
})
.catch(() => {
    console.log("Failed to connect to database");
})