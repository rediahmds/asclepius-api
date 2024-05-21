FROM node:lts-iron
WORKDIR /home/node/app/asclepius-api
ENV PORT 3000
ENV MODEL_URL <URL>
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "run", "start" ]
