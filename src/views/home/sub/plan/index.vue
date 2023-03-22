<template>
    <el-row :gutter="12">
        <h2 class="mb-4 mt-4 font-weight-normal text-center">选择最适合您的计划</h2>
        <el-col :span="8" v-for="p in plan" :key="p.id" @click.native="handlePlan(p)">
            <el-card shadow="hover">
                <h3>{{ p.title }}</h3>
                <div class="py-2">
                    <h1 class="color-green">{{ p.price }}</h1>
                    {{ p.type }}
                </div>
                <div class="text item">
                    <div v-for="(item, index) in p.item" :key="index + 'item'">
                        <i class="el-icon-success" />
                        {{ item }}
                    </div>
                    <div class="color-green" v-for="(item, index) in p.tip" :key="index + 'tip'">
                        <i class="el-icon-success" />
                        {{ item }}
                    </div>
                    <div class="color-brown" v-for="(item, index) in p.important" :key="index + 'important'">
                        <i class="el-icon-success" />
                        {{ item }}
                    </div>
                </div>
            </el-card>
        </el-col>

        <el-dialog :visible.sync="dialogVisible" width="26%" :before-close="handleClose">
            <div class="text-center">
                <h3>
                    <img width="30px"
                        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTg1MjM1Njc2NjE4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyMzMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDE3LjcyMDMyIDE3Ni44MDA0MjdsLTIuMDIwNjkzIDY2LjAyMDY5M0wxNDkuNTkyNzQ3IDI0Mi44MjExMmwwIDUwLjUyNDE2IDI2OS40NzU4NCAwIDAgODcuNTc5MzA3TDE5Ni43NTEzNiAzODAuOTI0NTg3bDAgNDcuODM0NDUzIDIyNS42ODI3NzMtMi4wMjQxMDcgMjI2LjM1ODYxMy0yLjAyMDY5My00LjA0MTM4NyAxNi4xNjg5NmMtMTAuMTA2ODggMzkuMDc1ODQtNTMuMjI0MTA3IDE0My40OTY1MzMtNjEuMzA2ODggMTQ2Ljg2MjA4LTQuNzE3MjI3IDEuMzQ4MjY3LTM3LjcyNzU3My02LjA2MjA4LTc0Ljc3OTMwNy0xNi44NDQ4LTExMi41MDY4OC0zNC4zNTUyLTE2OC40MjQxMDctNDQuNDYyMDgtMjQ0LjU0ODI2Ny00NC40NjIwOC03Ny40NzU4NCAwLjY3MjQyNy0xMjggMTQuODI0MTA3LTE3Ni41MDY4OCA0OS4xNzkzMDctOTQuMzEzODEzIDY3LjM2ODk2LTEwMS43MjQxNiAxOTkuNDEzNzYtMTQuMTQ0ODUzIDI3Mi44NDQ4IDkyLjk2NTU0NyA3OC4xNDgyNjcgMjQ1LjIyMDY5MyA4NS41NTUyIDM4My4zMjQxNiAxOC4xODk2NTMgNDkuMTc5MzA3LTIzLjU3OTMwNyAxMzcuNDMxMDQtODcuNTc5MzA3IDE2Ny4wNzI0MjctMTIwLjU4OTY1M2wxMi4xMjc1NzMtMTQuMTUxNjggMzguNCAxOC44NjU0OTNjMzguNCAxOS41MzQ1MDcgMjc1LjUzNzkyIDEyOS4zNDgyNjcgMzE1Ljk1ODYxMyAxNDYuMTg5NjUzbDIxLjU1NTIgOS40MzEwNCAwLTE3My4xMzc5Mi01OC42MTAzNDctMTUuNDkzMTJjLTUzLjIyMDY5My0xNC4xNTE2OC0xODkuMzA2ODgtNTYuNTg5NjUzLTIzMy4wOTY1MzMtNzMuNDM3ODY3bC0xNi44NDQ4LTYuNzM0NTA3IDIyLjIzNDQ1My00NS44MTAzNDdjMjMuNTc5MzA3LTQ3LjE1NTIgNzAuNzM3OTItMTgwLjU0ODI2NyA3MC43Mzc5Mi0yMDAuMDg2MTg3IDAtOS40MzEwNC0xMy40NzU4NC0xMC43NzkzMDctMTE3Ljg5NjUzMy0xMC43NzkzMDdsLTExNy44OTMxMiAwTDU2MC41MzQxODcgMjkzLjM0NTI4bDI4Mi45NTE2OCAwTDg0My40ODU4NjcgMjQ4Ljg4MzJjMC0yLjAyMDY5My02NC0zLjM2ODk2LTE0MS40NzU4NC0yLjY5MzEybC0xNDEuNDcyNDI3IDAuNjcyNDI3TDU2MC41Mzc2IDExMS40NTIxNmwtMTQwLjggMEw0MTcuNzIwMzIgMTc2LjgwMDQyN3pNMzkxLjQ0NDQ4IDYxNi4wMzg0YzM1LjAzNDQ1MyAxMi4xMzA5ODcgODEuNTE3MjI3IDMwLjk5MzA2NyAxMDMuMDc1ODQgNDIuNDQ0OGwzOS4wNzI0MjcgMjAuODg2MTg3LTIxLjU1ODYxMyAyNi45NDQ4NTNjLTEyLjEyNDE2IDE0LjgyMDY5My0zOS43NDQ4NTMgNDAuNDIwNjkzLTYyLjY1MTczMyA1Ny4yNjU0OTMtNzYuOCA1Ny4yNTg2NjctMTQ4LjIxMDM0NyA3OS40OTMxMi0yMzkuODMxMDQgNzQuMTAzNDY3LTk1LjY2MjA4LTUuMzg5NjUzLTE0Ni44NjIwOC00NC40NjIwOC0xNTIuOTI3NTczLTExNy4yMjA2OTMtNC4wNDEzODctNDUuMTM3OTIgNi4wNjU0OTMtNzAuNzM3OTIgMzcuMDU1MTQ3LTk0LjMxNzIyNyAzOS4wNzI0MjctMjkuNjQ0OCA3MC43MzQ1MDctMzYuMzc1ODkzIDE1Ni45NjU1NDctMzQuMzU1MkMzMTYuNjY4NTg3IDU5My44MTA3NzMgMzM3LjU1MTM2IDU5Ny44NTIxNiAzOTEuNDQ0NDggNjE2LjAzODRMMzkxLjQ0NDQ4IDYxNi4wMzg0eiIgcC1pZD0iMTIzNCIgZmlsbD0iIzQ1OUVFMyI+PC9wYXRoPjwvc3ZnPg==">
                    收银台
                </h3>
                <label>请扫描二维码支付 </label>
                <label class="fa-1_5x">{{ price }}</label>

                <el-row :gutter="24">
                    <el-col :span="14" :offset="5">
                        <!-- el-card内有padding，这里直接使用其样式，不使用组件 -->
                        <div class="el-card is-never-shadow">
                            <img width="200px" :src="qrcodeUrl" />
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
import QRCode from 'qrcode'
export default {
    name: "Plan",
    data() {
        return {
            plan: [],
            // 二维码Url
            qrcodeUrl: '',
            price: '',
            // 定时器，轮询获取支付结果
            timer: null,
            // 支付结果
            code: null,
            dialogVisible: false,
        }
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
            this.code = null;
            clearInterval(this.timer);
        },
        handlePlan(p) {
            this.dialogVisible = true;
            this.price = p.price;
            this.getQrcode();

            this.timer = setInterval(() => {
                if (this.code) {
                    return;
                }
                // 查询支付状态
                const result = { code: 200, message: '支付成功' }
                if (result.code == 200) {
                    // 保存支付结果
                    this.code = result.code;

                    const response = {
                        success: true,
                        code: '200',
                        message: '恭喜你，订阅成功',
                        timestamp: Date.now()
                    }
                    // 统一消息
                    this.$response(response);
                }
            }, 1000);
        },
        async getQrcode() {
            // 二维码
            const qrcode = 'chatGPT for world';
            this.qrcodeUrl = await QRCode.toDataURL(qrcode);
        },
        async getPlan() {
            const response = await this.$API.GET('/api/getPlan');
            if (response.success) {
                this.plan = response.data;
            }
        }
    },
    mounted() {
        this.getPlan();
    }
};
</script>