FROM node:16-alpine
WORKDIR /app
COPY package.json /app
RUN npm i
RUN npm i -g typescript@5.1.6
COPY . /app
RUN npm run build
EXPOSE 5002
CMD ["npm", "start"]
