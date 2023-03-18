<template>
    <div class="canvas">
        <canvas id="canvas" :width="contentWidth" :height="contentHeight"></canvas>
    </div>
</template>
    
<script>
export default {
    name: "Captcha",
    props: {
        captchaCode: {
            type: String,
            require: true
        },
        fontSizeMin: {
            type: Number,
            default: 28
        },
        fontSizeMax: {
            type: Number,
            default: 30
        },
        backgroundColorMin: {
            type: Number,
            default: 255
        },
        backgroundColorMax: {
            type: Number,
            default: 255
        },
        colorMin: {
            type: Number,
            default: 0
        },
        colorMax: {
            type: Number,
            default: 160
        },
        lineColorMin: {
            type: Number,
            default: 100
        }, lineColorMax: {
            type: Number,
            default: 255
        },
        dotColorMin: {
            type: Number,
            default: 0
        },
        dotColorMax: {
            type: Number,
            default: 255
        },
        contentWidth: {
            type: Number,
            default: 112
        },
        contentHeight: {
            type: Number,
            default: 40
        }
    },
    methods: {
        // 生成一个随机数
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        // 生成一个随机的颜色
        randomColor(min, max) {
            let r = this.randomNum(min, max);
            let g = this.randomNum(min, max);
            let b = this.randomNum(min, max);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
        drawPic() {
            let canvas = document.getElementById('canvas');
            let ctx = canvas.getContext('2d');
            ctx.textBaseline = 'bottom';
            // 绘制背景
            ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax);
            ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
            // 绘制文字
            for (let i = 0; i < this.captchaCode.length; i++) {
                this.drawText(ctx, this.captchaCode[i], i);
            }
            // 去掉干扰线
            // this.drawLine(ctx);
            this.drawDot(ctx);
        },
        drawText(ctx, txt, i) {
            ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
            ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px bold';
            let x = (i + 1) * (this.contentWidth / (this.captchaCode.length + 1));
            let y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
            // 设置旋转的角度
            var deg = this.randomNum(-10, 10);
            // 修改坐标原点和旋转角度
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            // 恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        },
        drawLine(ctx) {
            // 绘制干扰线
            for (let i = 0; i < 5; i++) {
                ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax);
                ctx.beginPath();
                ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
                ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
                ctx.stroke();
            }
        },
        drawDot(ctx) {
            // 绘制干扰点
            for (let i = 0; i < 50; i++) {
                ctx.fillStyle = this.randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    },
    watch: {
        captchaCode() {
            this.drawPic();
        }
    },
    mounted() {
        this.drawPic();
    }
}
</script>