# vue-cli-admin
Vue CLI快速启动，前端基本架构模型
- 菜单加载
- 动态路由
- 历史路由Tab标签
- 动态加载国际化
- 请求拦截
- 统一API
- 返回提示
- 组件化查询表格

## Preview
![demo0](./demo/demo0.jpg)
![demo1](./demo/demo1.jpg)

## Project setup
```
// 安装依赖
npm install
// 启动前端服务
npm run serve
// 启动后台服务
node server.local.js
```

## Docker run
```
// 安装依赖
npm install
// 构建
npm run build
// 构建镜像
docker build -f Dockerfile -t vue-cli-admin:latest .
// 启动镜像
docker run -d --name vue-cli-admin -p 80:80 vue-cli-admin
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
