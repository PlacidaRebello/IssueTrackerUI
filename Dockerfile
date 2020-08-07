FROM node as buildstep
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build -- --configuration=production

FROM nginx:1.19.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=buildstep /app/dist/IssueTrackerUI /usr/share/nginx/html
EXPOSE 80
