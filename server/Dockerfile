FROM node:16.10.0-alpine

ENV MODE=production

# RUN mkdir -p /server
WORKDIR /app/server

COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]
