<template>
    <el-header>
        <div class="float-left">
            <div class="text-center header-logo">
                <router-link to="/">
                    {{ $t('com_lab_000') }} &nbsp;&nbsp;
                </router-link>
                <i v-show="isCollapse" @click="collapseMenu()" class="el-icon-s-unfold"></i>
                <i v-show="!isCollapse" @click="collapseMenu()" class="el-icon-s-fold"></i>
            </div>
        </div>
        <div class="float-left header-menu-title">
            <span>{{ $t($route.meta.i18) || $route.meta.title }}</span>
        </div>
        <el-menu class="el-menu-demo float-right" mode="horizontal" @select="handleSelect" background-color="#2768d0"
            text-color="#fff" active-text-color="#fff">
            <el-menu-item>
                <Lang></Lang>
            </el-menu-item>
            <el-submenu index="info">
                <template slot="title">
                    <el-avatar :src="$store.state.user.info.avatar"></el-avatar>
                </template>
                <el-menu-item index="profile">{{ $t('com_lab_007') }}</el-menu-item>
                <el-menu-item index="logout">{{ $t('com_btn_002') }}</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-header>
</template>

<script>
import '@/assets/css/header.css'
import { auth } from "@/auth";
import Lang from '@/components/lang'
import { MessageBox } from 'element-ui';
export default {
    name: "Header",
    components: { Lang },
    data() {
        return {
            isCollapse: false,
        };
    },
    methods: {
        collapseMenu() {
            this.$bus.$emit('collapseMenu');
        },
        handleSelect(key, keyPath) {
            if ("profile" === key) {
                this.$router.push({ name: key });
            }
            else if ("logout" === key) {
                this.handleLogout();
            }
        },
        handleLogout() {
            MessageBox.confirm('确定要退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                auth.logout();
                this.$router.push({ path: "/login" });
            });
        }
    },
    mounted() {
        // 获取用户信息
        this.$store.dispatch('user/getInfo');
    }
};
</script>