FROM node:10 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG APP_MOUNT_URI
ARG API_URI
ARG STATIC_URL
ENV API_URI ${API_URI:-http://api.a6design.net:8000/graphql/}
ENV APP_MOUNT_URI ${APP_MOUNT_URI:-/dashboard/}
ENV STATIC_URL ${STATIC_URL:-/dashboard/}
RUN STATIC_URL=${STATIC_URL} API_URI=${API_URI} APP_MOUNT_URI=${APP_MOUNT_URI} npm run build

FROM nginx:stable
WORKDIR /app
COPY ./nginx/dashboard.a6design.net /etc/nginx/vhost.d/dashboard.a6design.net
COPY --from=builder /app/build/ /app/
RUN chown -R nginx:nginx /app
RUN chmod -R 755 /app
