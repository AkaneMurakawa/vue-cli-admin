// 过时，使用src/loadJS去加载，切换时刷新界面即可。不再通过import(``)形式动态加载
// import原形式如下：
// reloadLang() {
//     const lang = getLanguage();
//     this.$i18n.setLocaleMessage(lang, {})
//     import(`@/language/${lang}`).then(() => {
//         this.$i18n.setLocaleMessage(lang, this.getMessgae(lang));
//     })
// },
// getMessgae(lang) {
//     return {
//         // 使用变量来作为key
//         ...messages[lang],
//         ...window.language.lang
//     }
// },
(() => {
    window.language = {
        lang: {
            com_lab_000: '编程改变世界',
        }
    }
})()