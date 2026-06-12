FROM node:22-alpine

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
COPY *.webp ./
COPY *.mp4 ./

EXPOSE 8787

ENV PORT=8787
ENV DB_CLIENT=sqlite
ENV DB_PATH=/app/backend/data/monocle.sqlite
ENV STATIC_DIR=/app

CMD ["npm", "start"]
