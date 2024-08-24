FROM node:20-slim
WORKDIR /app
COPY package.json .
RUN npm install
RUN apt-get update -y && apt-get install -y openssl build-essential libpq-dev
RUN cd /app && npx prisma init
COPY . .
EXPOSE 8082
CMD ["node", "index.js"]