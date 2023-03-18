const express = require('express')
const history = require('connect-history-api-fallback')

const app = express()
// 解决url为history模式时刷新404问题
app.use(history())
// 设置静态资源目录
app.use(express.static(__dirname + '/dist'))

app.get('/', (req, res) => {
    res.send('Hello World')
})

const server = app.listen(9000, err => {
    if (!err) {
        console.log('App running at:')
        console.log(` - Local: http://localhost:${server.address().port}/`)
    }
})