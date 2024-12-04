# TasksApi

## Descrição do projeto

Esta API tem como objetivo o gerenciamento de tarefas e produtividade, permitindo que os usuários criem, editem, excluam e filtrem tarefas. A aplicação inclui suporte para categorias, diferentes níveis de prioridade e autenticação de usuários.

---

## 🔧 **Funcionalidades**

- **Gerenciamento de Tarefas**
  - Criar, editar e excluir tarefas.
  - Definir status: "Pendente", "Concluída", "Atrasada".
  - Atribuir categorias às tarefas.
  - Configurar prioridades: "Alta", "Média", "Baixa".
  - Filtrar tarefas por título e status.

- **Gerenciamento de Categorias**
  - Criar e excluir categorias para organização de tarefas.

- **Autenticação**
  - Cadastro e login de usuários com validação de credenciais e hash.
  - Autorização via token JWT.

- **Filtros e Busca**
  - Buscar tarefas por título.
  - Filtrar tarefas por status.

---

##Como baixar o repositório



## 🚀 **Tecnologias Utilizadas**

### **Back-End**
- Node.js
- Nodemon
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens) para autenticação
- bcrypt.js para hashing

### **Front-End**
- Vue.js (com Vue CLI)
- Axios para comunicação HTTP
