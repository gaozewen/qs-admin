FROM nginx:1.25.1

# 将 ./build 目录下的所有文件，拷贝到 nginx 容器中的 /usr/share/nginx/html 目录下
COPY ./build /usr/share/nginx/html

# 确保 Nginx 可以读取和执行静态文件和目录
RUN chmod -R 755 /usr/share/nginx/html

# 将 qs-admin 项目中的 nginx.conf 文件，
# 拷贝到 nginx 容器中的 /etc/nginx/conf.d/ 目录下，
# 并命名为 default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf