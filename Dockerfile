FROM node:16.14.0
WORKDIR ./
COPY . .
COPY package*.json ./
RUN npm install
CMD ["node", "server.js"]
EXPOSE 3001