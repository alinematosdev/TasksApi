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
          <option value="pendente">Pendentes</option>
          <option value="concluida">Concluídas</option>
          <option value="atrasada">Atrasadas</option>
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
          <select v-model="form.status" required>
            <option value="pendente">Pendente</option>
            <option value="concluida">Concluída</option>
            <option value="atrasada">Atrasada</option>
          </select>
          <button type="submit">{{ editingTask ? "Atualizar" : "Criar" }}</button>
        </form>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userName: "Usuário", // Nome fictício, pode ser substituído por um dado real
        tasks: [
          { id: 1, title: "Tarefa 1", description: "Descrição 1", status: "pendente" },
          { id: 2, title: "Tarefa 2", description: "Descrição 2", status: "concluida" },
          { id: 3, title: "Tarefa 3", description: "Descrição 3", status: "atrasada" },
        ],
        form: {
          title: "",
          description: "",
          status: "pendente",
        },
        editingTask: null,
        searchQuery: "",
        filterStatus: "",
      };
    },
    computed: {
      pendingTasks() {
        return this.tasks.filter((task) => task.status === "pendente").length;
      },
      completedTasks() {
        return this.tasks.filter((task) => task.status === "concluida").length;
      },
      overdueTasks() {
        return this.tasks.filter((task) => task.status === "atrasada").length;
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
      submitTask() {
        if (this.editingTask) {
          // Atualizar tarefa existente
          Object.assign(this.editingTask, this.form);
          this.editingTask = null;
        } else {
          // Criar nova tarefa
          const newTask = { ...this.form, id: Date.now() };
          this.tasks.push(newTask);
        }
        this.resetForm();
      },
      editTask(task) {
        this.editingTask = task;
        this.form = { ...task };
      },
      deleteTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      },
      resetForm() {
        this.form = { title: "", description: "", status: "pendente" };
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    max-width: 800px;
    margin: 0 auto;
  }
  
  header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  section {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .task-list ul {
    list-style: none;
    padding: 0;
  }
  
  .task-list li {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
  }
  
  button {
    margin-right: 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    opacity: 0.9;
  }
  </style>
  