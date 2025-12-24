FROM node:20-alpine
WORKDIR /app
COPY client/ .
RUN npm install && npm run build
EXPOSE 3000
CMD ["npm", "start"]
