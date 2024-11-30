const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, 'your_secret_key', { expiresIn: '30d' });
};

// Criar usuário (Registro)

const registerUser = async (req, res) => {
    try {
        const { nome, email, password } = req.body;

        const user = await User.create({ nome, email, password });

        res.status(201).json({
            _id: user._id,
            nome: user.nome,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {

        if (error.code === 11000 && error.keyPattern?.email) {
            return res.status(400).json({ message: "O email já está em uso" });
        }

        res.status(500).json({ message: error.message });
    }
};

// Autenticar usuário (Login)

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                nome: user.nome,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Credenciais inválidas" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Listar todos os usuários

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar usuário

const updateUser = async (req, res) => {
    try {
        const { nome, email, password } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        if (nome) user.nome = nome;

        if (email) {
            const emailInUse = await User.findOne({ email });
            if (emailInUse && emailInUse._id.toString() !== user._id.toString()) {
                return res.status(400).json({ message: "O email já está em uso" });
            }
            user.email = email;
        }

        if (password) {
            user.password = password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            nome: updatedUser.nome,
            email: updatedUser.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Deletar usuário

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        
        await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Usuário removido com sucesso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getUsers, updateUser, deleteUser };