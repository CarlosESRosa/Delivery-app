FROM node:16-alpine
WORKDIR /app-frontend
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT [ "npm", "start" ]
EXPOSE 3000
