const express = require("express");
const router = express.Router();
const {getTasks} = require('../controllers/task.controller.js');

router.get('/', getTasks);

module.exports = router;