FROM node:16.10.0-alpine

WORKDIR /app/client
COPY package.json ./
ENV PATH /app/node_modules/.bin:$PATH
ENV PORT=4000
RUN npm install --silent
COPY . .


# start app
CMD ["npm", "run", "build"]