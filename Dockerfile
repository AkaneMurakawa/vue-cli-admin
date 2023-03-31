FROM nginx
MAINTAINER github
VOLUME /tmp
ENV LANG en_US.UTF-8

ADD dist/ /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443