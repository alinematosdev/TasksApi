const express = require("express");
const Task = require("../models/task.model.js");
const router = express.Router();
const {getTasks, filterTask, createTask, updateTask, deleteTask} = require('../controllers/task.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.use(authMiddleware);
router.get('/', getTasks);
router.get("/filter/", filterTask);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;