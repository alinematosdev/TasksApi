<template>
  <div class="register-container">
    <h2>Cadastrar Usuário</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="fullName">Nome Completo</label>
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
    handleSubmit() {
      // Lógica de validação simples para o cadastro
      if (!this.fullName || !this.email || !this.password) {
        this.errorMessage = 'Todos os campos são obrigatórios!';
        return;
      }

      // Lógica de cadastro (aqui você pode adicionar uma chamada à API para criar o usuário)
      alert(`Usuário ${this.fullName} registrado com sucesso!`);

      // Redirecionar para a tela de login após o cadastro
      this.$router.push('/');
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
