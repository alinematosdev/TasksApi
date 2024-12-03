<template>
  <div class="dashboard">
    <header>
      <h1>Bem-vindo, {{ userName }}</h1>
      <p>Gerencie suas tarefas e produtividade.</p>
    </header>

    <!-- Resumo do Usuário -->
    <section class="user-summary">
      <h2>Resumo</h2>
      <ul>
        <li>Tarefas Pendentes: {{ pendingTasks }}</li>
        <li>Tarefas Concluídas: {{ completedTasks }}</li>
        <li>Tarefas Atrasadas: {{ overdueTasks }}</li>
      </ul>
    </section>

    <!-- Filtros e Busca -->
    <section class="filters">
      <h2>Buscar e Filtrar Tarefas</h2>
      <input type="text" v-model="searchQuery" placeholder="Buscar por título..." />
      <select v-model="filterStatus">
        <option value="">Todos</option>
        <option value="Pendente">Pendentes</option>
        <option value="Concluída">Concluídas</option>
        <option value="Atrasada">Atrasadas</option>
      </select>
      <button @click="applyFilters">Aplicar Filtros</button>
    </section>

    <!-- Lista de Tarefas -->
    <section class="task-list">
      <h2>Lista de Tarefas</h2>
      <ul>
        <li v-for="task in filteredTasks" :key="task.id">
          <h3>{{ task.title }}</h3>
          <p>{{ task.description }}</p>
          <small>Categoria: {{ task.category || 'Sem Categoria' }}</small>
          <small>Status: {{ task.status }}</small>
          <button @click="editTask(task)">Editar</button>
          <button @click="deleteTask(task.id)">Excluir</button>
        </li>
      </ul>
    </section>

    <!-- Formulário para Criação/Edição de Tarefa -->
    <section class="task-form">
      <h2>{{ editingTask ? "Editar Tarefa" : "Nova Tarefa" }}</h2>
      <form @submit.prevent="submitTask">
        <input type="text" v-model="form.title" placeholder="Título da Tarefa" required />
        <textarea v-model="form.description" placeholder="Descrição da Tarefa"></textarea>
        <select v-model="form.category">
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
          <option value="">Sem Categoria</option>
        </select>
        <select v-model="form.status" required>
          <option value="Pendente">Pendente</option>
          <option value="Concluída">Concluída</option>
          <option value="Atrasada">Atrasada</option>
        </select>
        <select v-model="form.priority" required>
          <option value="Alta">Alta</option>
          <option value="Média">Média</option>
          <option value="Baixa">Baixa</option>
        </select>
        <button type="submit">{{ editingTask ? "Atualizar" : "Criar" }}</button>
      </form>
    </section>

    <!-- Gerenciamento de Categorias -->
    <section class="categories">
      <h2>Gerenciar Categorias</h2>
      <input type="text" v-model="newCategory" placeholder="Nova Categoria" />
      <button @click="addCategory">Adicionar Categoria</button>
      <ul>
        <li v-for="category in categories" :key="category">
          {{ category }}
          <button @click="deleteCategory(category)">Excluir</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userName: "Usuário",
      tasks: [
        { id: 1, title: "Tarefa 1", description: "Descrição 1", category: "Trabalho", status: "Pendente" },
        { id: 2, title: "Tarefa 2", description: "Descrição 2", category: "Pessoal", status: "Concluída" },
        { id: 3, title: "Tarefa 3", description: "Descrição 3", category: "Estudo", status: "Atrasada" },
      ],
      categories: ["Trabalho", "Pessoal", "Estudo"],
      newCategory: "",
      form: {
        title: "",
        description: "",
        category: "",
        status: "Pendente",
        priority: "Baixa",
      },
      editingTask: null,
      searchQuery: "",
      filterStatus: "",
    };
  },

  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Dados recuperados do localStorage:", user);
    if (user && user.nome) {
      this.userName = user.nome;
    } else {
      this.userName = "Usuário";
    }
  },

  computed: {
    pendingTasks() {
      return this.tasks.filter((task) => task.status === "Pendente").length;
    },
    completedTasks() {
      return this.tasks.filter((task) => task.status === "Concluída").length;
    },
    overdueTasks() {
      return this.tasks.filter((task) => task.status === "Atrasada").length;
    },
    filteredTasks() {
      return this.tasks.filter((task) => {
        return (
          (!this.filterStatus || task.status === this.filterStatus) &&
          (!this.searchQuery || task.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      });
    },
  },

  methods: {
    applyFilters() {
      // Filtragem será aplicada automaticamente via `computed`.
    },
    async submitTask() {
      const user = JSON.parse(localStorage.getItem("user"));
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1);
      const taskData = {
        titulo: this.form.title,
        descricao: this.form.description,
        status: this.form.status,
        prioridade: this.form.priority,
        categoria: this.form.category || "Geral",
        dataVencimento: nextDay.toISOString(),
      };

      try {
        if (this.editingTask) {
          await axios.put(`http://localhost:2707/api/tasks/${this.editingTask.id}`, taskData, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          console.log("Tarefa atualizada com sucesso");
        } else {
          await axios.post("http://localhost:2707/api/tasks", taskData, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          console.log("Tarefa criada com sucesso");
        }
        this.resetForm();
      } catch (error) {
        console.error("Erro ao salvar a tarefa:", error.response ? error.response.data : error.message);
      }
    },
    editTask(task) {
      this.editingTask = task;
      this.form = { ...task };
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
    },
    resetForm() {
      this.form = { title: "", description: "", category: "", status: "Pendente", priority: "Baixa" };
    },
    addCategory() {
      if (this.newCategory && !this.categories.includes(this.newCategory)) {
        this.categories.push(this.newCategory);
        this.newCategory = "";
      }
    },
    deleteCategory(category) {
      this.categories = this.categories.filter((cat) => cat !== category);
      this.tasks = this.tasks.map((task) =>
        task.category === category ? { ...task, category: "" } : task
      );
    },
  },
};
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 24px;
  color: #333;
}

header p {
  font-size: 16px;
  color: #666;
}

/* Resumo do Usuário */
.user-summary ul {
  list-style: none;
  padding: 0;
}

.user-summary li {
  font-size: 16px;
  margin-bottom: 8px;
}

/* Filtros e Busca */
.filters input,
.filters select {
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.filters button {
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.filters button:hover {
  background-color: #0056b3;
}

/* Lista de Tarefas */
.task-list ul {
  list-style: none;
  padding: 0;
}

.task-list li {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.task-list h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.task-list p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

.task-list small {
  display: block;
  font-size: 12px;
  color: #999;
}

.task-list button {
  margin-right: 5px;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.task-list button:nth-child(1) {
  background-color: #ffc107;
  color: #333;
}

.task-list button:nth-child(1):hover {
  background-color: #e0a800;
}

.task-list button:nth-child(2) {
  background-color: #dc3545;
  color: white;
}

.task-list button:nth-child(2):hover {
  background-color: #bd2130;
}

/* Formulário de Tarefas */
.task-form input,
.task-form textarea,
.task-form select {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.task-form button {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.task-form button:hover {
  background-color: #218838;
}

/* Gerenciamento de Categorias */
.categories input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: calc(100% - 120px);
  display: inline-block;
}

.categories button {
  padding: 8px 12px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  display: inline-block;
  vertical-align: top;
}

.categories button:hover {
  background-color: #0056b3;
}

.categories ul {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.categories li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.categories li button {
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.categories li button:hover {
  background-color: #bd2130;
}

</style>
