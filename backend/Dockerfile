FROM node:alpine  
WORKDIR /app
COPY package*.json ./
RUN npm install
ARG NODE_ENV="prod"
RUN if [ "$NODE_ENV" = "dev" ]; then npm install -g nodemon; fi
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
