const Category = require("../models/category.model");

// Listar categorias por usuário
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ usuario: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Criar categoria
const createCategory = async (req, res) => {
  try {
    console.log("User from token:", req.user);
    console.log("Request body:", req.body);
    const category = await Category.create({
      ...req.body,
      usuario: req.user.id,
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deletar categoria
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndDelete({ _id: id, usuario: req.user.id });

    if (!category) return res.status(404).json({ message: "Categoria não encontrada" });

    res.status(200).json({ message: "Categoria deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar categoria
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndUpdate(
      { _id: id, usuario: req.user.id },
      req.body,
      { new: true }
    );

    if (!category) return res.status(404).json({ message: "Categoria não encontrada" });

    const updatedCategory = await Category.findById(id);
    res.status(200).json(updatedCategory);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};