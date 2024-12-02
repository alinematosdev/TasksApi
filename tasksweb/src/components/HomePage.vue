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
    </div>
  </template>
  
  <script>

  import axios from "axios";

  export default {
    data() {
      return {
        userName: "Usuário", // Nome fictício, pode ser substituído por um dado real
        tasks: [
          { id: 1, title: "Tarefa 1", description: "Descrição 1", status: "Pendente" },
          { id: 2, title: "Tarefa 2", description: "Descrição 2", status: "Concluida" },
          { id: 3, title: "Tarefa 3", description: "Descrição 3", status: "Atrasada" },
        ],
        form: {
          title: "",
          description: "",
          status: "Pendente",
          priority: "Baixa",
        },
        editingTask: null,
        searchQuery: "",
        filterStatus: "",
      };
    },

    created() {
    // Recupere os dados do usuário do localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Dados recuperados do localStorage:", user);
    if (user && user.nome) {
      this.userName = user.nome;
        }  else {
      this.userName = "Usuário";
      }
    },

    computed: {
      pendingTasks() {
        return this.tasks.filter((task) => task.status === "Pendente").length;
      },
      completedTasks() {
        return this.tasks.filter((task) => task.status === "Concluida").length;
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
      // Verificar se está editando uma tarefa existente ou criando uma nova
      const user = JSON.parse(localStorage.getItem("user"));
      // Adicionando 1 dia à data atual e atribuindo à data de vencimento para não gerar erro. *Adicionar campo de data de vencimento.
      const nextDay = new Date();
      nextDay.setDate(nextDay.getDate() + 1); 
      const taskData = {
        titulo: this.form.title,
        descricao: this.form.description,
        status: this.form.status,
        prioridade: this.form.priority,
        categoria: "geral",
        dataVencimento: nextDay.toISOString(),
      };

      try {
        // Se estiver editando a tarefa
          if (this.editingTask) {
            await axios.put(`http://localhost:2707/api/tasks/${this.editingTask.id}`, taskData, {
              headers: {
                Authorization: `Bearer ${user.token}`, // Adiciona o token do usuário para autenticação
              },
            });
            console.log("Tarefa atualizada com sucesso");
          } else {
            // Se for uma nova tarefa, faz o POST
            await axios.post("http://localhost:2707/api/tasks", taskData, {
              headers: {
                Authorization: `Bearer ${user.token}`, // Adiciona o token do usuário para autenticação
              },
            });
            console.log("Tarefa criada com sucesso");
          }
          this.resetForm(); // Limpa o formulário
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
        this.form = { title: "", description: "", status: "Pendente" };
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
  