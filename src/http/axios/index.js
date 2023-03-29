import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress"
import {
    getLanguage
} from "@/plugin/i18";
import {
    Message
} from 'element-ui';
import {
    auth
} from "@/auth";

/**
 * 基础配置
 */
const requests = axios.create({
    // 跨域请求时发送Cookie
    withCredentials: true,
    baseURL: process.env.VUE_APP_DOMAIN_URL,
    timeout: 6000,
});

/**
 * 请求拦截
 */
requests.interceptors.request.use((config) => {
    // 进度条开始
    nProgress.start();
    // 此处不需要转换，否则data会被变成undefined，会忽略请求头content-type
    // config.data = JSON.stringify(config.data);
    // 添加公共请求头
    config.headers = {
        'content-type': 'application/json;charset=UTF-8',
        'satoken': auth.getSatoken(),
        'language': getLanguage(),
        'timezone': Intl.DateTimeFormat().resolvedOptions().timeZone,
    }
    return config;
}, (error) => {
    console.error(error);
});

/**
 * 响应拦截，错误信息展示使用ElementUI Message
 */
requests.interceptors.response.use((response) => {
    // 进度条结束
    nProgress.done();
    const result = response.data;
    // 当后台全局异常处理，统一返回指定的格式时
    // 例如：{code: '401', success:false, data:null, message:'未授权，请重新登录', 'timestamp': 123456789,}
    let code = result?.code;
    if (code == '401') {
        let errorMsg = '未授权，请重新登录';
        window.location.href = "/login";
        Message.error(errorMsg);
        return Promise.resolve(errorMsg);
    } else if (code == '403') {
        error.message = '拒绝访问'
        window.location.href = "/forbidden";
        Message.error(errorMsg);
        return Promise.resolve(errorMsg);
    }
    return result;
}, (error) => {
    if (error && error.response) {
        switch (error.response.status) {
            case 400:
                error.message = '错误请求'
                break;
            case 401:
                error.message = '未授权，请重新登录'
                break;
            case 403:
                error.message = '拒绝访问'
                break;
            case 404:
                error.message = '请求错误,未找到该资源'
                window.location.href = "/NotFound"
                break;
            case 405:
                error.message = '请求方法未允许'
                break;
            case 408:
                error.message = '请求超时'
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = '网络错误'
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        if (JSON.stringify(error).includes('timeout')) {
            Message.error('服务器响应超时，请刷新当前页');
        }
        error.message = '连接服务器失败';
    }
    Message.error(error.message);
    return Promise.resolve(error.response);
});

export default requests;