const express = require('express')
const bodyParser = require('body-parser')
const md5 = require('md5')
const menu = require('./data/menu.js')
const locale = require('./data/locale.js')
const plan = require('./data/plan.js')
const userInfo = require('./data/userInfo.js')

const app = express()
// req.body包含在请求正文中提交的数据键值对。默认情况下，它是 undefined，
// 并在您使用 body-parser 和 multer 等正文解析中间件时填充
// for parsing application/json
app.use(bodyParser.json())
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}))

// 公共返回
class Result {
    static success(data) {
        return {
            success: true,
            code: '200',
            data,
            message: '操作成功',
            timestamp: Date.now()
        }
    }
    static error(message) {
        return {
            success: false,
            code: '200',
            message,
            timestamp: Date.now()
        }
    }
}

// 模拟后台验证码缓存，这里用数组不用map，便于模拟队列，移除时候先进先出
var captchaCache = []

app.get('/getMenu', (req, res) => {
    res.send(Result.success(menu))
})

app.get('/getLocale', (req, res) => {
    res.send(Result.success(locale))
})

app.get('/getPlan', (req, res) => {
    res.send(Result.success(plan))
})

app.post('/login', (req, res) => {
    let captchaObj;
    captchaCache.forEach(item => {
        if (item.key == req.body.captchaKey) {
            captchaObj = item;
            return;
        }
    });
    // 验证码校验，验证码由后端生成，防止非法请求跳过校验，
    // 注意：这里做的是简单版，实际上后端应该返回的是图片而不是文字，如果是文字轻易就被识别了
    if (!captchaObj) {
        res.send(Result.error('请刷新验证码'));
    } else if (captchaObj.value !== req.body.captcha) {
        res.send(Result.error('验证码错误'));
    } else {
        console.log(req.body.email, '上线了')
        res.send(Result.success(createToken()))
    }
})

app.get('/getUserInfo', (req, res) => {
    res.send(Result.success(userInfo))
})

app.get('/getCaptcha/:captchaKey', (req, res) => {
    // 获取query参数
    // console.log(req.query);
    // 获取params
    // console.log(req.params);

    const captch = createCaptcha();
    const captchaKey = req.params.captchaKey;
    captchaCache.push({
        key: captchaKey,
        value: captch
    })
    res.send(Result.success(captch));
})

const server = app.listen(9000, err => {
    if (!err) {
        console.log('App running at:')
        console.log(` - Local: http://localhost:${server.address().port}/`)
        allkeysTTL();
    }
})

/**
 * 随机token
 */
function createToken(leng) {
    leng = leng == undefined ? 32 : leng
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789'
    let token = ''
    for (let i = 0; i < leng; ++i) {
        token += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return md5(token)
}

/**
 * 随机验证码
 */
function createCaptcha(leng) {
    leng = leng == undefined ? 4 : leng
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz23456789'
    let captcha = '';
    for (let i = 0; i < leng; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
}

/**
 * 模拟移除过期验证码
 */
function allkeysTTL() {
    // 一分钟
    const interval = 60 * 1000;
    setInterval(() => {
        while (captchaCache.length > 0) {
            let before = Date.now() - interval
            if (captchaCache[0].key < before) {
                captchaCache.shift();
                continue;
            }
            break;
        }
        // -10000表示缓存处理时间
    }, interval - 10000);
}