FROM nginx
MAINTAINER github
VOLUME /tmp
ENV LANG en_US.UTF-8
RUN echo "mkdir /var/www/html" \
    &&  mkdir -p /var/www/html

ADD dist/ /var/www/html/
ADD nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443