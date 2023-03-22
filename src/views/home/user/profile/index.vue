<template>
    <div>
        <el-row :gutter="12" class="mb-4">
            <el-col :span="24">
                <el-card shadow="never">
                    <div>我的钱包</div>
                    <span class="display-4">649.34</span> <span>CNY</span>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12" class="mb-4">
            <el-col :span="24">
                <el-card shadow="never">
                    <div style="width: 40%;">
                        <div>修改密码</div>
                        <el-form :model="passForm" status-icon :rules="rules" ref="passForm" class="passForm">
                            <el-form-item prop="oldPass">
                                <el-input type="password" v-model="passForm.oldPass" placeholder="请输入旧密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="newPass">
                                <el-input type="password" v-model="passForm.newPass" placeholder="请输入新密码"></el-input>
                            </el-form-item>
                            <el-form-item prop="checkPass">
                                <el-input type="password" v-model="passForm.checkPass" placeholder="请确认新密码"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" class="si-login" @click="handlerPass('passForm')">
                                    保存
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                </el-card>
            </el-col>
        </el-row>

        <el-row :gutter="12" class="mb-4">
            <el-col :span="24">
                <el-card shadow="never">
                    <div>通知</div>
                    <h3>到期邮件提醒</h3>
                    <el-switch v-model="dueNotify"></el-switch>
                    <h3>流量邮件提醒</h3>
                    <el-switch v-model="flowNotify"></el-switch>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Profile",
    data() {
        return {
            dueNotify: false,
            flowNotify: false,
            passForm: {
                oldPass: '',
                newPass: '',
                checkPass: '',
            },
            rules: {
                oldPass: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
                newPass: [{ required: true, message: "请输入新密码", trigger: "blur" }],
                checkPass: [{ required: true, message: "请确认新密码", trigger: "blur" }],
            }
        }
    },
    methods: {
        handlerPass(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.modifyPass();
                } else {
                    return false;
                }
            });

        },
        modifyPass() {
            this.$message.success('修改成功');
        }
    }
};
</script>