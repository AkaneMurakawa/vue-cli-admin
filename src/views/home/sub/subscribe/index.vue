<template>
    <el-row :gutter="12" class="text-center">
        <el-col :span="12">
            <el-card shadow="hover" @click.native="handleSubscribe()">
                <p class=" fa-2x">+</p>
                <p class="text-muted">购买订阅</p>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "Subscribe",
    methods: {
        handleSubscribe() {
            this.$router.push({ name: 'plan' })
        }
    }
};
</script>