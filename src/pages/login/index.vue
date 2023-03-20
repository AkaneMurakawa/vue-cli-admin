<template>
    <el-row :gutter="24">
        <el-col class="mt-15vh" :span="8" :xs="{ span: 24, offset: 0 }" :offset="8">
            <el-card shadow="hover" class="login-container">
                <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" class="loginForm">
                    <div class="login-title-container">
                        <a href="/">{{ $t('com_lab_000') }}</a>
                    </div>
                    <el-form-item prop="email">
                        <el-input type="email" v-model="loginForm.email" prefix-icon="el-icon-user" placeholder="账号"
                            clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input type="password" v-model="loginForm.pass" prefix-icon="el-icon-lock" placeholder="密码"
                            autocomplete="off" show-password @keyup.enter.native="submitForm('loginForm')"></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                        <el-input class="float-left captcha-input" maxlength="4" type="text" v-model="loginForm.captcha"
                            prefix-icon="el-icon-picture-outline-round" placeholder="验证码" clearable>
                        </el-input>
                        <Captcha class="float-right" :captchaCode="captchaCode" @click.native="refreshCaptcha"></Captcha>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="login-btn" icon="el-icon-s-promotion"
                            @click="submitForm('loginForm')">
                            {{ $t('com_btn_001') }}
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <div class="login-text-container text-left">
                            <a href="#" class="login-text-muted">{{ $t('com_lab_001') }}</a>
                            <a href="#" class="login-text-muted">{{ $t('com_lab_002') }}</a>
                            <div class="login-lang float-right">
                                <Lang></Lang>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import '@/assets/css/login.css'
import { auth } from '@/auth';
import Lang from '@/components/lang'
import Captcha from './captcha'
export default {
    name: "Login",
    components: {
        Lang,
        Captcha
    },
    data() {
        return {
            captchaCode: '',
            loginForm: {
                email: "",
                pass: "",
                captcha: '',
                captchaKey: '',
            },
            rules: {
                email: [
                    { required: true, message: "请输入邮箱地址", trigger: "blur" },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"],
                    },
                ],
                pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
                captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
            },
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login();
                } else {
                    return false;
                }
            });
        },
        async login() {
            const response = await this.$API.POST('/api/login', this.loginForm);
            if (response.success) {
                // 存储token
                auth.login(response.data);
                // 获取用户信息
                this.$store.dispatch('user/getInfo');
                // 路由跳转
                this.$router.push({ path: '/' });
            } else {
                this.$response(response);
            }
        },
        async getCaptcha() {
            const captchaKey = Date.now();
            this.loginForm.captchaKey = captchaKey;
            const response = await this.$API.GET(`/api/getCaptcha/${captchaKey}`);
            if (response.success) {
                this.captchaCode = response.data;
            }
        },
        refreshCaptcha() {
            this.getCaptcha();
        }
    },
    mounted() {
        this.getCaptcha();
    }
};
</script>
<style scoped>
.el-main {
    background-image: url('@/assets/images/bg.png');
}
</style>