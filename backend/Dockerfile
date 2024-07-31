FROM node:20-alpine
WORKDIR /app
COPY package*.json  ./
RUN npm install
COPY . .
COPY .env . 
EXPOSE 8000
CMD [ "npm","start" ]