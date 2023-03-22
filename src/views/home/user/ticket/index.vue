<template>
    <el-card shadow="never">
        <!-- search-table配置参数 -->
        <search-table :soptions="soptions" :toptions="toptions" :form="sform" :tableData="tableData"
            @handleSearch="handleSearch" @handleReset="handleReset" @handlerEvent="handlerEvent" :immediate="true">
            <!-- v-slot:table -->
            <!-- 如果设置了:cell-style="{ 'text-align': 'center', 'background': '#f5f7fa' }"，则align="center"会失效 -->
            <el-table slot="table" :data="tableData.records" ref="multipleTable" @selection-change="handleSelectionChange"
                :header-cell-style="{ 'text-align': 'center', 'background': '#f5f7fa' }" border class="width">
                <!-- 选择框 -->
                <el-table-column type="selection" align="center" width="55">
                </el-table-column>
                <!-- 序号 -->
                <el-table-column type="index" label="序号" align="center" width="60">
                </el-table-column>
                <el-table-column prop="subject" label="主题" align="center" width="120">
                </el-table-column>
                <el-table-column prop="workOrderLevel" align="center" label="工单级别"
                    :formatter="(row) => formatOption('workOrderLevel', row.workOrderLevel)" width="100">
                </el-table-column>
                <el-table-column prop="workOrderStatus" align="center" label="工单状态"
                    :formatter="(row) => formatOption('workOrderStatus', row.workOrderStatus)" width="100">
                </el-table-column>
                <el-table-column prop="reply" label="最后回复" align="left" width="200" max-height="100">
                </el-table-column>
                <el-table-column prop="evaluate" label="评价" align="center" width="200">
                    <!-- 获取参数，
                        方式一 slot-scope="{row}"
                        方式二 slot-scope="scope"
                    -->
                    <template slot-scope="{row}">
                        <el-rate :value="row.evaluate" show-text>
                        </el-rate>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" width="200"
                    :formatter="(row) => formatTime(row.createTime)">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-view" @click="handleDetail(scope.row)" type="text"></el-button>
                        <el-button icon="el-icon-edit-outline" @click="handleEdit(scope.row)" type="text"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </search-table>

        <!-- 弹出框，before-close一定要记得重置一下 -->
        <el-dialog :title="pageTile[page]" :visible.sync="dialogVisible" width="35%" :before-close="handlerDialogCancel">
            <el-form :model="eform" status-icon :rules="rules" ref="eform" class="eform">
                <!-- 使用rules校验，需要将prop 属性设置为需校验的字段名 -->
                <el-form-item label="主题" prop="subject">
                    <el-input :disabled="page === 'detail'" v-model.trim="eform.subject" maxlength="50" show-word-limit
                        placeholder="请输入工单主题" clearable />
                </el-form-item>
                <el-form-item prop="workOrderLevel">
                    <div>
                        <label :for="eform.workOrderLevel" class="typeClass">工单级别</label>
                    </div>
                    <el-select v-model="eform.workOrderLevel" :disabled="page === 'detail'" :multiple="false"
                        placeholder="请选择" clearable>
                        <el-option v-for="option in Constant.workOrderLevel" :key="option.value"
                            :label="$t(option.i18) || option.label" :value="option.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="消息" prop="question">
                    <el-input v-model="eform.question" :disabled="page === 'detail'" type="textarea" :rows="5"
                        maxlength="256" show-word-limit placeholder="请描述您遇到的问题">
                    </el-input>
                </el-form-item>
            </el-form>

            <!-- 按钮需区分新增/编辑/详情 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="handlerDialogCancel">取 消</el-button>
                <el-button v-if="page !== 'detail'" type="primary" @click="handlerDialogSave('eform')">确 定</el-button>
            </span>
        </el-dialog>
    </el-card>
</template>

<script>
import SearchTable from '@/components/search-table'
import { soptions, toptions } from './config'
import { formatOption, formatTime } from '@/util/formatter'
import Constant from '@/common/constant'
export default {
    name: "Ticket",
    components: {
        SearchTable
    },
    data() {
        return {
            soptions,
            toptions,
            // 查询表单
            sform: {
                current: 1,
                size: 10,
            },
            eform: {
                subject: '',
                workOrderLevel: '',
                question: '',
            },
            // 使用表单的rules校验，更多配置格式见https://github.com/yiminghe/async-validator
            // {pattern: /^[0-9]*$/, message: `请输入数字`, trigger: 'blur'}
            rules: {
                subject: [
                    { type: 'string', message: `请输入字符串`, trigger: 'blur' },
                    { required: true, message: "请输入工单主题", trigger: "blur" },
                    // 正则校验
                    { pattern: /^.{5,}$/, message: `工单主题不少于5个字`, trigger: 'blur' }
                ],
                workOrderLevel: [{ required: true, message: "请选择工单级别", trigger: "blur" }],
                question: [
                    { required: true, message: "请描述您遇到的问题", trigger: "blur" },
                    // min，max，
                    { min: 10, max: 256, message: '请输入10-256位', trigger: 'blur' }
                ],
            },
            tableData: {},
            multipleSelection: [],
            // 业务url较多，统一管理
            url: {
                list: '/api/getTicket'
            },
            // lsit | add | detail | edit
            page: 'list',
            pageTile: {
                add: '新增',
                detail: '详情',
                edit: '编辑',
            },
            dialogVisible: false,
            Constant
        }
    },
    methods: {
        formatOption,
        formatTime,
        // 查询
        async handleSearch(form) {
            const response = await this.$API.POST(this.url.list, form);
            if (response.success) {
                this.tableData = response.data;
            } else {
                this.$response(response);
            }
        },
        // 重置查询条件
        handleReset() {
            this.sform = {
                current: 1,
                size: 10,
            };
        },
        // 详情
        handleDetail(row) {
            this.page = 'detail';
            this.eform = { ...row }
        },
        // 编辑
        handleEdit(row) {
            this.page = 'edit';
            this.eform = { ...row }
        },
        // table头部事件处理
        handlerEvent(opt) {
            // 调用处理方法，等价于this.handleEventAdd()、this.handleEventCancel()
            this[opt.method]();
        },
        // 打开新增界面
        handleEventAdd() {
            this.page = 'add';
        },
        // 重置弹出框
        handlerDialogCancel() {
            this.page = 'list';
            this.eform = {
                subject: '',
                workOrderLevel: '',
                question: '',
            }
        },
        // 弹出框保存
        handlerDialogSave(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    setTimeout(() => {
                        this.$message.success(JSON.stringify(this.eform));
                        // 重置弹出框
                        this.handlerDialogCancel();
                    }, 500)
                    this.$message.success('保存成功');
                } else {
                    return false;
                }
            });

        },
        // 取消
        handleEventCancel() {
            // 校验
            if (this.multipleSelection.length < 1) {
                this.$message.error('请先勾选要取消的数据');
                return;
            }
            // 提示
            this.$confirm('确定要取消吗?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message.success(`${this.multipleSelection.map(item => item.subject).join('')} 取消成功`);
            }).finally(() => {
                // 清空选择
                this.$refs.multipleTable.clearSelection();
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },
    watch: {
        // 监听page
        page(newVal) {
            if (newVal !== 'list') {
                this.dialogVisible = true;
            } else {
                this.dialogVisible = false;
            }
        }
    },
    mounted() {
    }
};
</script>