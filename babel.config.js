module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset',
        ["@babel/preset-env", {
            "modules": false
        }]
    ],
    "plugins": [
        // 动态导入插件
        "@babel/plugin-syntax-dynamic-import",
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}