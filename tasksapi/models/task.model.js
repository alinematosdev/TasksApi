const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
    {
        titulo: {
            type: String,
            required: [true, "Escolha um título para a tarefa"],
            maxlength: [60, "Limite de 60 caracteres"],
        },

        descricao: {
            type: String,
            required: [true, "Insira uma descrição para a tarefa"],
            maxlength: [1000, "Limite de 1000 caracteres"],
        },
        dataVencimento: {
            type: Date,
            required: [true, "Insira uma data de vencimento para a tarefa"],
            validate: {
                validator: function (value) {
                    return value > new Date();
                },
                message: "A data de vencimento deve ser no futuro",
            },
        },
        status: {
            type: String,
            enum: ["Pendente", "Em andamento", "Concluída"],
            default: "Pendente",
            required: [true, "Escolha um status para a tarefa"],
        },
        categoria: {
            type: String,
            required: [true, "Escolha um status para a tarefa"],
            maxlength: [20, "Limite de 1000 caracteres"],
        },
        prioridade: {
            type: String,
            enum: ["Alta", "Média", "Baixa"],
            default: "Baixa",
        },
        usuario: {  // Add the 'usuario' field to link each task to a user
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }

);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;