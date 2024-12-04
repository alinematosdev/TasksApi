# Etapa 1: Build do projeto
FROM node:18 AS builder

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package*.json ./
COPY . .

# Instala as dependências e executa o build
RUN npm install
RUN npm run build

# Etapa 2: Servir os arquivos estáticos
FROM nginx:alpine

# Remove o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos gerados no build para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia um arquivo de configuração personalizado, se necessário
# COPY nginx.conf /etc/nginx/nginx.conf

# Porta exposta
EXPOSE 80

# Comando padrão
CMD ["nginx", "-g", "daemon off;"]