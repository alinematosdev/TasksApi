const express = require('express');
const { registerUser, loginUser, getUsers, updateUser, deleteUser } = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware.js');

const router = express.Router();

router.post('/registro', registerUser);
router.post('/login', loginUser);


router.get('/', authMiddleware, getUsers);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;