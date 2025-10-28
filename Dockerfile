# 1. Imagen base con Node.js
FROM node:22-alpine

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar package.json y package-lock.json
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install --legacy-peer-deps

# 5. Copiar todo el código
COPY . .

# 6. Exponer el puerto de NestJS
EXPOSE 3000

# 7. Comando para correr la app en modo desarrollo
CMD ["npm", "run", "start:dev"]
