# TasksApi

## Descrição do projeto

Esta API tem como objetivo o gerenciamento de tarefas e produtividade, permitindo que os usuários criem, editem, excluam e filtrem tarefas. A aplicação inclui suporte para categorias, diferentes níveis de prioridade e autenticação de usuários.

---

## 🔧 **Funcionalidades**

- **Controle de Tarefas**
  - Criar, editar e excluir tarefas.
  - Definir status: "Pendente", "Concluída", "Atrasada".
  - Atribuir categorias às tarefas.
  - Configurar prioridades: "Alta", "Média", "Baixa".
  - Filtrar tarefas por título e status.

- **Controle de Categorias**
  - Criar e excluir categorias para organização de tarefas.

- **Autenticação**
  - Cadastro e login de usuários com validação de credenciais e hash.
  - Autorização via token JWT.

- **Filtros e Busca**
  - Buscar tarefas por título.
  - Filtrar tarefas por status.

---

## Como baixar o repositório

1. Verifique sua versão do git
   
git --version

2. Clone o repositório 

git@github.com:alinematosdev/TasksApi.git

3. Acessa a pasta do projeto

cd Tasks-Api

## Pré-requisitos

Express.js/ 
MongoDB/ 
Mongoose/ 
jsonwebtoken/ 
bcrypt/ 
Vue/ 
Axios/ 
Cors/ 

## Como contribuir

1. Realizar Fork
2. Criar uma branch para as modificações
3. Fazer commit na branch criada
4. Criar Pull Request
5. Clicar no botão “Compare & Pull Request”
6. Selecionar a Branch “main” como base e a Branch criada “tasks-nomedabranch” como Branch de comparação
7. Preencher os detalhes sobre a atualização ou modificação realizada
8. Enviar Pull Request e aguardar aprovação


## 🚀 **Tecnologias Utilizadas**

### **Back-End**
- Node.js
- Nodemon
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens) para autenticação
- bcrypt.js para hashing

### Coleção Postman

![Imagem coleção](https://github.com/user-attachments/assets/6b3b6426-0573-4e22-b051-d128cf080305)

Acesse a coleção aqui https://web.postman.co/workspace/TasksAPI~0d24abaa-8f73-4a23-9570-8e9a457b5363/collection/39989838-789e8d9c-27fd-4531-92d5-907f6ea418d3

### Exemplo - Criar uma categoria

![Requisicao Criar Categoria](https://github.com/user-attachments/assets/69dec1a2-2298-405c-87e7-fe227d02a81a)

### Exemplo - Criar uma tarefa

![Requisicao Criar Tarefa](https://github.com/user-attachments/assets/7c68d180-be3a-4145-be92-b7543d87225c)


### Relacionamento entre os documentos

![Diagrama Banco](https://github.com/user-attachments/assets/e10725c5-5e05-4a82-b8ef-9fbadb9f3870)


### **Front-End**
- Vue.js (com Vue CLI)
- Axios para comunicação HTTP

### Interface Web

Login

![Imagem Tela Login](https://github.com/user-attachments/assets/a4082dc1-537f-4df7-a967-9e6743252047)

Cadastro

![Imagem Tela Cadastro](https://github.com/user-attachments/assets/b292d2cc-9963-4216-8413-521c71be983f)

Home

![Tela Home 1](https://github.com/user-attachments/assets/df089922-08ff-42ae-b59f-9c96ba23e2b9)

![Tela Home 2](https://github.com/user-attachments/assets/e7a919fb-bb40-4eda-8670-2ee5c468713d)


## Autores

* Aline Morais Matos
* Victor Nascimento Aguiar
* Fábio Rodrigues da Silva Júnior
* Matheus Braynner Silva de Souza
* Lucas Gabriel Oliveira da Silva
* Rodrigo Luiz Antão de Andrade Santos

## 📝 Licença

Este projeto está licenciado sob a licença [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).


