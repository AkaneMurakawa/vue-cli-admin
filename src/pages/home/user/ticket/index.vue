<template>
    <el-card shadow="never">
        <!-- search-table配置参数 -->
        <search-table :soptions="soptions" :toptions="toptions" :form="sform" :tableData="tableData"
            @handleSearch="handleSearch" @handleReset="handleReset" @handlerEvent="handlerEvent" :immediate="true">
            <!-- v-slot:table -->
            <el-table slot="table" :data="tableData.records" ref="multipleTable" @selection-change="handleSelectionChange"
                :cell-style="{ 'text-align': 'center' }"
                :header-cell-style="{ 'text-align': 'center', 'background': '#f5f7fa' }" border class="width">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="subject" label="主题" width="120">
                </el-table-column>
                <el-table-column prop="workOrderLevel" label="工单级别"
                    :formatter="(row) => formatOption('workOrderLevel', row.workOrderLevel)" width="100">
                </el-table-column>
                <el-table-column prop="workOrderStatus" label="工单状态"
                    :formatter="(row) => formatOption('workOrderStatus', row.workOrderStatus)" width="100">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="200"
                    :formatter="(row) => formatTime(row.createTime)">
                </el-table-column>
                <el-table-column prop="reply" label="最后回复" width="200" max-height="100">
                </el-table-column>
                <el-table-column prop="evaluate" label="评价" width="120">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button icon="el-icon-view" @click="handleClick(scope.row)" type="text"></el-button>
                        <el-button icon="el-icon-edit-outline" type="text"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </search-table>
    </el-card>
</template>

<script>
import SearchTable from '@/components/searchTable'
import { soptions, toptions } from './config'
import { formatOption, formatTime } from '@/util/formatter'
import { MessageBox } from 'element-ui';
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
            tableData: {},
            multipleSelection: [],
        }
    },
    methods: {
        formatOption,
        formatTime,
        async handleSearch(form) {
            const response = await this.$API.POST('/api/getTicket', form);
            if (response.success) {
                this.tableData = response.data;
            } else {
                this.$response(response);
            }
        },
        handleReset() {
            this.sform = {
                current: 1,
                size: 10,
            };
        },
        // table头部事件处理
        handlerEvent(opt) {
            // 调用处理方法，等价于this.handleAdd()、this.handleCancel()
            this[opt.method]();
        },
        handleAdd() {

        },
        handleCancel() {
            console.log(this.$refs.multipleTable)
            // 校验
            if (this.multipleSelection.length < 1) {
                this.$message.error('请先勾选要取消的数据');
                return;
            }
            // 提示
            MessageBox.confirm('确定要取消吗?', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message.success(`${this.multipleSelection.map(item => item.subject).join('')} 取消成功`);
                // 清空选择
                this.$refs.multipleTable.clearSelection();
            });
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },
    mounted() {
    }
};
</script>