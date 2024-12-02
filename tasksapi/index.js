const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose');
const taskRoute = require('./routes/task.route.js');
const categoryRoute = require('./routes/category.route.js');
const userRoute = require('./routes/user.route.js');
const app = express();
app.use(cors());

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

mongoose.connect("mongodb://127.0.0.1:27017/TasksApi")
.then(() => {
    console.log("Connected to database");
    app.listen(2707, () => {
        console.log('Server is running on port 2707');
    });
})
.catch((err) => {
    console.error("Failed to connect to database:", err.message);
})