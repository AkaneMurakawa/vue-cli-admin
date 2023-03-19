<template>
    <div>
        <search-table :options="options" :form="eform" :tableData="tableData" @handleSearch="handleSearch"
            @handleReset="handleReset" :immediate="true">
            <el-table slot="table" :data="tableData.records" @selection-change="handleSelectionChange"
                :cell-style="{ 'text-align': 'center' }" :header-cell-style="{ 'text-align': 'center' }" border
                class="width">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column type="index" label="序号" width="50">
                </el-table-column>
                <el-table-column prop="subject" label="主题" width="120">
                </el-table-column>
                <el-table-column prop="workOrderLevel" label="工单级别"
                    :formatter="(row) => formatOption('workOrderLevel', row.workOrderLevel)" width="120">
                </el-table-column>
                <el-table-column prop="workOrderStatus" label="工单状态"
                    :formatter="(row) => formatOption('workOrderStatus', row.workOrderStatus)" width="120">
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
    </div>
</template>

<script>
import SearchTable from '@/components/searchTable'
import { options } from './config'
import { formatOption, formatTime } from '@/util/formatter'
export default {
    name: "Ticket",
    components: {
        SearchTable
    },
    methods: {
        formatOption,
        formatTime,
        async handleSearch(form) {
            const response = await this.$API.POST('/api/getTicket', form);
            if (response.success) {
                this.tableData = response.data;
            } else {
                this.$message(response);
            }
        },
        handleReset() {
            this.eform = { ...this.form };
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },

    data() {
        return {
            // search table options
            options,
            form: {
                workOrder: '',
                no: undefined,
                systemNo: undefined,
                workOrderLevel: '',
                createTime: undefined,
                create: undefined,
                current: 1,
                size: 10,
            },
            eform: {},
            tableData: {},
        }
    },
    mounted() {
        this.eform = { ...this.form }
    }
};
</script>