# Guia de Contribuição
## 📖 Descrição do Projeto
Este projeto é uma API de Controle de Tarefas e Produtividade que permite gerenciar tarefas com recursos como criação, edição, exclusão, categorização, filtragem e autenticação de usuários. Sua contribuição é bem-vinda para melhorar ou expandir as funcionalidades existentes!

## 📂 Como Baixar o Repositório

Faça um fork deste repositório clicando no botão Fork no canto superior direito.

Clone o repositório forkado para sua máquina local:

* git clone git@github.com:seu-usuario/seu-fork.git  
* cd seu-fork  
* Adicione o repositório original como remoto para manter sua branch atualizada:

git remote add upstream git@github.com:repositorio-original/repo.git

## ✅ Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:

Node.js
npm
Vue CLI
MongoDB

## Instalação de Dependências

### tasksapi (Back-end):

npm init -y  
npm install express  
npm install nodemon  
npm install mongodb  
npm install mongoose  
npm install jsonwebtoken  
npm install bcrypt  
npm install cors

Executar servidor com "npm run dev"

Para facilitar dev:

nodemon server.js  

### tasksweb (Front-end):

npm install -g @vue/cli  
npm install vue/router  
npm install axios  

Execute o servidor com "npm run serve"


## 🤝 Como Contribuir

1. Criar uma Branch
  Antes de iniciar qualquer modificação, crie uma nova branch para organizar seu trabalho.

  git checkout -b tasks-nome-da-branch 

2. Fazer Alterações
  Realize suas alterações no código.
  Certifique-se de seguir as boas práticas e testar suas alterações localmente.

3. Commit e Push

  git add .  
  git commit -m "Mensagem de commit" 
  git push origin tasks-nome-da-branch  


4. Criar um Pull Request

Acesse o repositório forkado no GitHub.
Clique em Compare & Pull Request.
Escolha a branch main como base e a branch criada como comparação.
Adicione uma descrição sobre sua contribuição e clique em Create Pull Request.
Aguarde a revisão de um dos mantenedores do projeto.
