FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY index.html styles.css script.js jquery-3.7.1.js frames.png ./
COPY images ./images
EXPOSE 80
