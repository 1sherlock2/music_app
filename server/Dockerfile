FROM node:16-bullseye

ENV MODE=production

WORKDIR /app/server

COPY . .

RUN npm install
RUN npm run build

# CMD ["tail", "-f", "/dev/null"]
CMD ["npm", "run", "start:prod"]

