FROM node:12.10-slim

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

EXPOSE 8081

CMD ["npm", "run", "start:prod"]
