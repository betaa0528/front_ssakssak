# 1️. Node 환경에서 빌드
FROM node:20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 2️. Nginx를 사용하여 정적 파일 서빙
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 3️. 컨테이너가 실행될 때 Nginx 실행
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]