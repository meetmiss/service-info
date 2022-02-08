<template>
    <div class="SummaryTable">
        <div class="title">
            <i class="el-icon-s-platform"></i>
            <span>全国气象部门对外服务信息汇总表</span>
        </div>
        <div class="explain">
            <p>填报说明：</p>
            <p>1、除数据资源项目为单位整体的存储总量外，其余项目的统计时间范围均为2018.1.1~至今的累积量；</p>
            <p>2、数据产品数量按照每个数据集算1种进行累加统计。</p>
        </div>
        <el-table :data="alldata" :span-method="arraySpanMethod" border style="width: 100%">
            <el-table-column>
                <el-table-column prop="category"></el-table-column>
                <el-table-column prop="activityName">
                    <template slot-scope="scope">
                        <div v-if="scope.row.category === '操作'">
                            <el-button type="text" @click="handleEdit">编辑</el-button>
                            <el-button type="text">复制</el-button>
                            <el-button type="text">保存</el-button>
                            <el-button type="text" @click="handleDel(scope)">删除</el-button>
                        </div>
                        <span v-else>{{scope.row.activityName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="message">
                    <template slot-scope="scope">
                        <el-input v-if="(scope.row.count === null || scope.row.span_num === null) && flag" v-model="scope.row.keyValue"></el-input>
                        <span v-else-if="(scope.row.count === null || scope.row.span_num === null) && !flag">{{scope.row.keyValue}}</span>
                        <span v-else>{{scope.row.message}}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-input v-if="flag" v-model="scope.row.keyValue"></el-input>
                    <span v-else>{{scope.row.keyValue}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { summaryList } from '@/mock/mock.js'
import { queryLoad } from '@/api'
export default {
    name: 'SummaryTable',
    data () {
        return {
            alldata: [],
            flag: false,
            oldData: null
        }
    },
    created () {
         // 二次处理数据
        this.alldata = this.handleTableArr(summaryList);
        this.handleQueryTable()
    },
    mounted () {

    },
    methods: {
        // 解析数据
        handleTableArr (data) {
            const arr = [];
            for (let i = 0; i < data.length; i++) {
                const categoryInfo = data[i];
                const activityPointsDOS = categoryInfo.activityPointsDOS;
                let count = 0;
                if (activityPointsDOS.length > 0) {
                    for (let j = 0; j < activityPointsDOS.length; j++) {
                        const activityTwoInfo = activityPointsDOS[j];
                        const activityTwoActivityPointsDOS = activityPointsDOS[j].activityPointsDOS;
                        if (activityTwoActivityPointsDOS.length > 0) {
                            for (let k = 0; k < activityTwoActivityPointsDOS.length; k++) {
                                count++;
                                const info = {
                                    // 确定每天数据的 合并行的数量
                                    span_num: k === 0 ? activityTwoActivityPointsDOS.length : 0,
                                    keyName: activityTwoActivityPointsDOS[k].keyName,
                                    keyValue: activityTwoActivityPointsDOS[k].keyValue,
                                    message: activityTwoActivityPointsDOS[k].message,
                                    activityName: activityTwoInfo.activityName,
                                    category: categoryInfo.category,
                                    key: ''
                                };
                                arr.push(info);
                            }
                            arr[arr.length - count].count = count;
                        } else {
                            arr.push({
                                span_num: j !== 0 ? activityPointsDOS.length : null,
                                count: j === 0 ? activityPointsDOS.length : null,
                                keyName: activityTwoInfo.keyName,
                                keyValue: activityTwoInfo.keyValue,
                                message: activityTwoInfo.message,
                                activityName: activityTwoInfo.activityName,
                                category: categoryInfo.category,
                                key: ''
                            })
                        }
                    }
                } else {
                    arr.push({
                        key: 'operate',
                        category: '操作'
                    })
                }
            }
            return arr;
        },
        // 表格合并的方法
        arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
            if (row.category === '操作') {
                // 第一列
                if (columnIndex === 0) {
                    return [1, 3]
                } else if (columnIndex === 1) {
                    return [1, 1]
                } else {
                    return [0, 0]
                }
            } else if (row.count === null || row.span_num === null) {
                // 第一列
                if (columnIndex === 0) {
                    if (row.count) {
                        return [row.count, 2]
                    } else {
                        return [0, 0]
                    }
                } else if (columnIndex === 1 || columnIndex === 2) {
                    return [1, 1]
                } else {
                    return [0, 0]
                }
            } else {
                // 第一列
                if (columnIndex === 0) {
                    if (row.count) {
                        return [row.count, 1]
                    } else {
                        return [0, 0]
                    }
                }
                // 第二列
                if (columnIndex === 1) {
                    if (row.span_num > 0) {
                        return [row.span_num, 1]
                    } else {
                        return [0, 0]
                    }
                }
            }
        },
        handleQueryTable () {
            queryLoad({ TABLE_NAME: 'ESMD_INFO_SUMMARY' }).then(res1 => {
                console.log('1111', res1);
            }).catch(err => {
                console.log('2222', err);
            })
        },
        // 编辑
        handleEdit () {
            console.log('编辑', this.alldata);
            this.flag = true
            this.oldData = JSON.parse(JSON.stringify(this.alldata))
        },
        // 删除
        handleDel (scope) {
            this.$confirm('点击确定将清空本调查表所有数据，确认清空？', '确认清空', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.alldata = JSON.parse(JSON.stringify(this.oldData))
                this.flag = false
            }).catch(() => {})
        }
    }
}
</script>

<style lang="less" scoped>
.SummaryTable {
    .title {
        margin-bottom: 5px;
        text-align: left;
        .el-icon-s-platform {
            margin-right: 5px;
            color: #409EFF;
            font-size: 18px;
            vertical-align: bottom;
        }
    }
    .el-table {
        /deep/ .el-table__header {
            width: 100% !important;
            display: none;
        }
        /deep/ .el-table__body {
            width: 100% !important;
            background-color: pink !important;
        }
    }
    .explain {
        margin-bottom: 10px;
        padding-left: 23px;
        p {
            margin: 0;
            text-align: left;
        }
    }
}
</style>
