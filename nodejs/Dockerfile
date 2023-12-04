FROM node:20.10.0

WORKDIR /app

COPY . . 

RUN npm i -g pnpm
RUN pnpm i

RUN chmod +x entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]

