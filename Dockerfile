# Use a imagem oficial do Node.js
FROM node:20-slim

# Diretorio de trabalho
WORKDIR /app

# Copiar arquivos de dependencia
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar o restante do codigo
COPY . .

# Build do projeto TypeScript
RUN npm run build

# Expor a porta que o Express usa
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "start"]
