FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY backend ./backend
COPY admin ./admin
COPY *.html ./
COPY *.css ./
COPY *.js ./
COPY *.png ./
COPY *.jpg ./
COPY *.jpeg ./

EXPOSE 8787

ENV PORT=8787
ENV DB_CLIENT=sqlite
ENV DB_PATH=/app/backend/data/monocle.sqlite
ENV STATIC_DIR=/app

CMD ["npm", "start"]
