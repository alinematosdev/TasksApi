<template>
  <div class="register-container">
    <h2>Cadastrar Usuário</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="fullName">Nome</label>
        <input type="text" id="fullName" v-model="fullName" placeholder="Digite seu nome completo" required />
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" placeholder="Digite seu e-mail" required />
      </div>
      <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" placeholder="Digite sua senha" required />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
    
    <!-- Mensagem de erro -->
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    
    <!-- Link para voltar para o login -->
    <div class="login-link">
      <button @click="goToLogin">Já tem uma conta? Faça login</button>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {

    isPasswordStrong(password) {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return regex.test(password);
    },

    async handleSubmit() {
      // Lógica de validação simples para o cadastro
      if (!this.fullName || !this.email || !this.password) {
        this.errorMessage = 'Todos os campos são obrigatórios!';
        return;
      }

      if (!this.isPasswordStrong(this.password)) {
        this.errorMessage = 'A senha deve ter pelo menos 8 caracteres, conter letras, números e caracteres especiais.';
        return;
      }

      // Lógica de cadastro (aqui você pode adicionar uma chamada à API para criar o usuário)
      try {
        const response = await axios.post("http://localhost:2707/api/users/registro", {
          nome: this.fullName,
          email: this.email,
          password: this.password
        });

      alert(`Usuário ${response.data.nome} registrado com sucesso!`);

      // Redirecionar para a tela de login após o cadastro
      this.$router.push('/');
    } catch (error) {
        
        if (error.response && error.response.data.message) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "Erro ao cadastrar usuário.";
        }
      }
    },
    goToLogin() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.register-container {
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
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #218838;
}

.error {
  color: red;
  font-size: 14px;
  text-align: center;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link button {
  background-color: #007bff;
}

.login-link button:hover {
  background-color: #0056b3;
}
</style>
