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
    </el-row>
</template>

<script>
import { Message } from 'element-ui';
export default {
    name: "Plan",
    data() {
        return {
            plan: []
        }
    },
    methods: {
        handlePlan() {
            const response = {
                success: true,
                code: '200',
                message: '恭喜你，订阅成功',
                timestamp: Date.now()
            }
            // 统一消息
            this.$message(response);
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