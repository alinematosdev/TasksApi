const express = require('express')
const mongoose = require('mongoose');
const taskRoute = require('./routes/task.route.js');
const categoryRoute = require('./routes/category.route.js');
const userRoute = require('./routes/user.route.js');
const app = express();

//Middleware
app.use(express.json());

//Rotas
app.use("/api/tasks", taskRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/users", userRoute);  

//--------- Servidor
app.get("/", (req, res) => {
    res.send("Hello from Node API Server");
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