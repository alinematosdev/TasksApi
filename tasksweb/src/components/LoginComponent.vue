<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">Nome de Usuário</label>
          <input type="text" id="username" v-model="username" placeholder="Digite seu nome de usuário" required />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="password" placeholder="Digite sua senha" required />
        </div>
        <div class="enter-link"> 
        <button @click="goToHomePage">Entrar</button>
        </div>
      </form>
      
      <!-- Mensagem de erro -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      
      <!-- Botão de Cadastro de Usuário -->
      <div class="register-link">
        <button @click="goToRegister">Cadastrar-se</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginCompont",
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      handleSubmit() {
        // Lógica de autenticação (exemplo simples)
        if (this.username === 'admin' && this.password === '12345') {
          alert('Login bem-sucedido!');
          // Redirecionar para a página principal ou dashboard
        } else {
          this.errorMessage = 'Usuário ou senha incorretos!';
        }
      },
      goToHomePage(){
        alert('abrir tela inicial');
        this.$router.push('/Home');
      },
      goToRegister() {
        // Aqui você pode navegar para a página de registro ou abrir um modal de cadastro
        alert('Abrir tela de cadastro');
        // Exemplo de redirecionamento para outra rota (se você tiver um sistema de rotas configurado)
        this.$router.push('/RegisterComponent');
   
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    font-size: 14px;
    text-align: center;
  }
  
  .register-link {
    text-align: center;
    margin-top: 20px;
  }
  
  .register-link button {
    background-color: #28a745;
  }
  
  .register-link button:hover {
    background-color: #218838;
  }
  </style>
  