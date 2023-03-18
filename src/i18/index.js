import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locale from 'element-ui/lib/locale'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'

Vue.use(VueI18n)

const LOCALE = "locale"
const LANGUAGE = 'language';
const lang = getLanguage();

// 语言类型
export function getLocale() {
    const locale = localStorage.getItem(LOCALE);
    return locale && JSON.parse(locale);
}

export function setLocale(locale) {
    return localStorage.setItem(LOCALE, JSON.stringify(locale));
}

// 语言资源
export function getLanguage() {
    return localStorage.getItem(LANGUAGE) || window._CONFIG.defaultLanguage;
}
export function setLanguage(lang) {
    localStorage.setItem(LANGUAGE, lang);
}

export const messages = {
    zhCn: {
        ...zhLocale
    },
    enUs: {
        ...enLocale
    },
}

/**
 * 国际化，语法：$t('xxxxxx')
 */
const i18n = (language) => {
    const I18n = new VueI18n({
        locale: lang,
        messages: {
            [lang]: {
                // 使用变量来作为key
                ...messages[lang],
                ...language
            }
        }
    })
    locale.i18n((key, value) => I18n.t(key, value));
    return I18n;
}

export default i18n;