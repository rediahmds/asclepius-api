FROM node:lts-iron
WORKDIR /home/node/app/asclepius-api
ENV MODEL_URL <URL>
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "npm", "run", "start" ]
