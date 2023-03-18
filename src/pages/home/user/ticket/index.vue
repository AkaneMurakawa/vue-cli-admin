<template>
    <div>
        <search-table :options="options" :form="eform" @handleSearch="handleSearch" @handleReset="handleReset">
            <el-table slot="table" :data="tableData" border class="width">
                <el-table-column fixed prop="date" label="#" width="150">
                </el-table-column>
                <el-table-column prop="name" label="主题" width="120">
                </el-table-column>
                <el-table-column prop="province" label="工单级别" width="120">
                </el-table-column>
                <el-table-column prop="city" label="工单状态" width="120">
                </el-table-column>
                <el-table-column prop="address" label="创建时间" width="300">
                </el-table-column>
                <el-table-column prop="zip" label="最后回复" width="120">
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </search-table>
    </div>
</template>

<script>
import SearchTable from '@/components/searchTable'
import { options } from './config'
export default {
    name: "Ticket",
    components: {
        SearchTable
    },
    methods: {
        handleSearch() {
            this.tableData = this.list();
        },
        handleReset() {
            this.eform = {...this.form};
        },
        list() {
            return [{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            }, {
                date: '2016-05-04',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
            }]
        },
        handleClick(row) {
            console.log(row);
        }
    },

    data() {
        return {
            tableData: [],
            form: {
                workOrder: '',
                no: undefined,
                systemNo: undefined,
                workOrderLevel: '',
                createTime: undefined,
                create: undefined,
            },
            eform:{},
            // search table options
            options
        }
    },
    mounted() {
        this.eform = {...this.form}
        // this.tableData = this.list();
    }
};
</script>
<style scoped></style>