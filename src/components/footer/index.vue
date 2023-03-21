<template>
    <el-footer>
        <div>
            <span>版权&copy;&nbsp;2023&nbsp;</span>
            <span v-show="new Date().getFullYear() != 2023">
                - {{ new Date().getFullYear() }}
            </span>
            <a href="/">编程改变世界</a>
            <a href="#">关于我们</a>
        </div>
    </el-footer>
</template>

<script>
import '@/assets/css/footer.css'
export default {
    name: "Footer",
};
</script>