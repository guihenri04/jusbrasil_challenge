FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

EXPOSE 3000

# Comando para desenvolvimento
CMD ["npm", "start"] 