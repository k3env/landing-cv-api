FROM node:16.19.1-bullseye-slim
WORKDIR /app
COPY . .
RUN yarn install --production=false
EXPOSE 3000
CMD [ "yarn", "dev" ]