import {
    getLanguage
} from '@/plugin/i18'

/**
 * 初始化国际化语言JS
 */
const loadJS = function loadJS(callback) {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `/language/${getLanguage()}/index.js?t=${Date.now()}`;
    script.async = false;
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = function () {
        callback();
    };
    script.onerror = function () {
        callback();
    };
}

export default loadJS;