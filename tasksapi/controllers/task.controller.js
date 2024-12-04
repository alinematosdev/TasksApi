const Task = require('../models/task.model');

//Ler todas as tarefas do usuário

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ usuario: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//Filtrar tarefa por título, categoria, ou status

const filterTask = async (req, res) => {
    try {
        const { titulo, status } = req.query;
        let filter = { usuario: req.user.id };

        if (titulo) {
            filter.titulo = titulo;
        }

        if (status) {
            filter.status = status;
        }

        const task = await Task.find(filter);

        if (task.length === 0) {
            return res.status(404).json({ message: "Nenhuma tarefa encontrada com este filtro" });
        }

        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Criar tarefa

const createTask = async (req, res) => {
    try {
        const { titulo, descricao, dataVencimento, status, categoria, prioridade } = req.body;
        const task = await Task.create({
            titulo,
            descricao,
            dataVencimento,
            status,
            categoria,
            prioridade,
            usuario: req.user.id, 
        });
        res.status(200).json(task);
    } catch (error) {

        res.status(500).json({message: error.message});
    }
}

//Atualizar tarefa

const updateTask = async (req, res) => {
    try {
        
        const{ id } = req.params;
        const task = await Task.findOneAndUpdate(
            { _id: id, usuario: req.user.id },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Tarefa não encontrada"});
        }

        const updatedTask = await Task.findById(id);
        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Deletar tarefa

const deleteTask = async (req, res) => {
    try {
        const{ id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, usuario: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Tarefa não encontrada"});
        }

        return res.status(200).json({ message: "Tarefa deletada com sucesso"});

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getTasks,
    filterTask,
    createTask,
    updateTask,
    deleteTask
};