# Dockerfile

FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4444
CMD [ "npm", "start"]

# docker compose build
# docker compose up
# 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