const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome da categoria é obrigatório"],
      maxlength: [50, "Limite de 50 caracteres"],
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;