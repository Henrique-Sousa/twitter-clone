FROM node:alpine  
WORKDIR /app
COPY package*.json ./
ARG NODE_ENV="production"
RUN npm install
RUN if [ "$NODE_ENV" = "development" ]; then npm install -g nodemon; fi
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
