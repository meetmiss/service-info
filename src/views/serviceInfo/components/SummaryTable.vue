<template>
    <div class="SummaryTable">
        <div class="title">
            <div>
                <i class="el-icon-s-platform"></i>
                <span>全国气象部门对外服务信息总表</span>
            </div>
            <div class="explain">
                <p>填报说明：</p>
                <p>1、除数据资源项目为单位整体的存储总量外，其余项目的统计时间范围均为2018.1.1~至今的累积量；</p>
                <p>2、数据产品数量按照每个数据集算1种进行累加统计；</p>
                <p>3、如无内容填0或者无。</p>
            </div>
        </div>
        <div class="operateButton">
            <el-button type="text" @click="handleAddDate">新增</el-button>
            <el-upload class="upload-demo" action="/MDRSC/api/rest/UploadServlet/upload?TABLENAME=ESMD_INFO_SUMMARY" accept='.xls, .xlsx' :show-file-list="false" :on-success="handleSuccess" :on-error="handleError">
                <el-button type="text" size="small">导入</el-button>
            </el-upload>
            <el-button type="text" @click="handleDownTem">下载模板</el-button>
            <el-button type="text" @click="handleClearData">清空</el-button>
        </div>
        <el-table :data="tableHead" :span-method="arraySpanMethod" border style="width: 100%">
            <el-table-column>
                <el-table-column prop="category" width="100"></el-table-column>
                <el-table-column prop="activityName" width="150" >
                    <template slot-scope="scope">
                        <span>{{scope.row.activityName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="message" width="300">
                    <template slot-scope="scope">
                        <span>{{scope.row.message}}</span>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column v-for="(colItem, colIndex) in tableData" :key="colItem.ID ? colItem.ID : colIndex" width="300">
                <template slot-scope="scope">
                    <div v-if="scope.$index === 0">
                        <el-button type="text" v-if="colItem.ID" :disabled="operateDataIndex !== -1 && operateDataIndex !== colIndex" @click="handleEdit(colItem, colIndex)">编辑</el-button>
                        <el-button type="text" v-if="colItem.ID" :disabled="operateDataIndex !== -1 && operateDataIndex !== colIndex" @click="handleCopy(colItem)">复制</el-button>
                        <el-button type="text" :disabled="operateDataIndex !== -1 && operateDataIndex !== colIndex" @click="() => handleSave(colItem)">保存</el-button>
                        <el-popconfirm title="确认删除数据？" confirm-button-text="删除" style="margin-left: 10px;" @confirm="handleDel(colItem)">
                            <el-button slot="reference" type="text" :disabled="operateDataIndex !== -1 && operateDataIndex !== colIndex">删除</el-button>
                        </el-popconfirm>
                    </div>
                    <span v-else-if="scope.$index === 1">{{colItem['D_CHECK_INFO']}}</span>
                    <div v-else-if="operateDataIndex === colIndex">
                        <el-input v-if="scope.row.type === 'input'" v-model="colItem[scope.row.keyName]" :id="scope.row.keyName"></el-input>
                        <el-select v-else v-model="colItem[scope.row.keyName]" :id="scope.row.keyName">
                            <el-option v-for="selItem in selectList[scope.row.keyName]" :key="selItem.code" :label="selItem.text" :value="selItem.text"></el-option>
                        </el-select>
                    </div>
                    <!-- <el-input v-else-if="operateDataIndex === colIndex" v-model="colItem[scope.row.keyName]"></el-input> -->
                    <span v-else>{{colItem[scope.row.keyName]}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { summaryList, D_DEPART_LEVEL, IS_SHARE_POLICY, IS_BUILD_PLATFORM, D_DATADOWN_MODE, IS_SERVICE_TOOL, summaryErrInfo } from '@/mock/mock.js'
import { queryLoad, addInsert, updateData, deleteData } from '@/api'
export default {
    name: 'SummaryTable',
    props: ['activeName', 'userInfo'],
    data () {
        return {
            summaryList,
            selectList: {
                D_DEPART_LEVEL, IS_SHARE_POLICY, IS_BUILD_PLATFORM, D_DATADOWN_MODE, IS_SERVICE_TOOL
            },
            tableHead: [],
            tableData: [],
            operateDataIndex: -1, // 编辑的数据索引
            addFlag: false,
            validateMsg: summaryErrInfo,
            validateFlag: false,
            oldData: null // 当前编辑数据
        }
    },
    watch: {
        activeName: {
            handler (val) {
                if (val === 'first') {
                    this.handleReset()
                    this.handleQueryTable()
                }
            }
        }
    },
    created () {
         // 二次处理数据
        this.tableHead = this.handleTableArr(summaryList);
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
                            // 三级表头
                            for (let k = 0; k < activityTwoActivityPointsDOS.length; k++) {
                                count++;
                                const info = {
                                    // 确定每天数据的 合并行的数量
                                    span_num: k === 0 ? activityTwoActivityPointsDOS.length : 0,
                                    keyName: activityTwoActivityPointsDOS[k].keyName,
                                    keyValue: activityTwoActivityPointsDOS[k].keyValue,
                                    message: activityTwoActivityPointsDOS[k].message,
                                    activityName: activityTwoInfo.activityName,
                                    type: activityTwoActivityPointsDOS[k].type,
                                    category: categoryInfo.category,
                                    key: ''
                                };
                                arr.push(info);
                            }
                            arr[arr.length - count].count = count;
                        } else {
                            // 二级表头
                            arr.push({
                                span_num: j !== 0 ? activityPointsDOS.length : null,
                                count: j === 0 ? activityPointsDOS.length : null,
                                keyName: activityTwoInfo.keyName,
                                keyValue: activityTwoInfo.keyValue,
                                message: activityTwoInfo.message,
                                activityName: activityTwoInfo.activityName,
                                type: activityTwoInfo.type,
                                category: categoryInfo.category,
                                key: ''
                            })
                        }
                    }
                } else {
                    // 一级表头
                    arr.push({
                        key: 'operate',
                        category: '操作',
                        type: 'input'
                    }, {
                        category: '校验信息',
                        keyName: 'D_CHECK_INFO',
                        type: 'input'
                    })
                }
            }
            return arr;
        },
        // 表格合并的方法
        arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0 || rowIndex === 1) {
                if (columnIndex === 0) {
                    return [1, 3]
                } else if (columnIndex === 1 || columnIndex === 2) {
                    return [0, 0]
                } else {
                    return [1, 1]
                }
            }
            if (row.count === null || row.span_num === null) {
                // 第一列
                if (columnIndex === 0) {
                    if (row.count) {
                        return [row.count, 2]
                    } else {
                        return [0, 0]
                    }
                } else if (columnIndex === 2) {
                    return [0, 0]
                } else {
                    return [1, 1]
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
        // 重置
        handleReset () {
            this.operateDataIndex = -1
            this.addFlag = false
            this.validateFlag = false
            this.$notify.closeAll()
        },
        // 查询表格数据
        handleQueryTable () {
            queryLoad({ TABLE_NAME: 'ESMD_INFO_SUMMARY' }).then(res => {
                if (res.data.retcode === '01') {
                    this.tableData = res.data.data
                } else {
                    res && this.$message.error(res.data.retmsg)
                }
            })
        },
        // 新增
        handleAddDate () {
            this.$notify.closeAll()
            const lastData = this.tableData.slice(-1)[0]
            if (lastData && !lastData.ID) {
                this.tableData = this.tableData.slice(0, -1)
            }
            setTimeout(() => {
                this.tableData.push({
                    D_CHECK_INFO: '', // 校验信息
                    D_DEPART_NAME: this.userInfo.depart, // 单位名称
                    D_DEPART_LEVEL: '', // 单位级别（国家级/省级）
                    IS_SHARE_POLICY: '', // 是否出台了数据共享相关政策
                    D_POLICY_NUM: '', // 数据共享相关政策数量
                    D_POLICY: '', // 数据共享相关政策
                    D_DATA_SHARE_SCOPE: '', // 现有数据共享政策适用范围
                    D_STORAGE_NUM: '', // 存储的数据产品数量（个）
                    D_STORAGE_SIZE: '', // 存储的数据产品总量（TB）
                    D_OPENSHARING_NUM: '', // 开放共享的数据产品数量（个）
                    D_OPENSHARING_SIZE: '', // 数据开放共享总量（TB）
                    D_SHARE_CLOUD_SIZE: '', // 数据在云端的共享量（TB）
                    D_SHARE_NUM: '', // 参与数据交换的行业部门数量（个）
                    D_SHARE_SIZE: '', // 行业部门间数据交换总量（TB）
                    D_COLLECTION_NUM: '', // 数据汇交行业部门数量（个）
                    D_COLLECTION_SIZE: '', // 数据汇交总量（TB）
                    D_ISSUE_NUM: '', // 数据分发行业部门数量（个）
                    D_ISSUE_SIZE: '', // 数据分发总量（TB）
                    D_GLOBAL_SIZE: '', // 全球数据交换量（TB）
                    D_MONITOR_REPORT_NUM: '', // 遥感监测报告数（期）
                    D_FYSAT_COUNTRY_NUM: '', // 应用风云卫星数据的国家数（个）
                    D_SERVICE_COUNTRY_NUM: '', // 气象数据服务一带一路国家数（个）
                    IS_BUILD_PLATFORM: '', // 是否建设数据共享平台
                    D_PLATFORM: '', // 共享平台名称及地址
                    D_DATADOWN_MODE: '', // 数据共享平台下载方式
                    D_VISIT_NUM: '', // 数据共享平台访问量（万次）
                    D_CUSTOMER_NUM: '', // 数据共享平台用户数（万个）
                    D_SERVICE_SIZE: '', // 数据平台数据服务量（TB）
                    D_DATADOWN_NUM: '', // 数据平台下载次数（万次）
                    D_COUNTRY_PROJ_NUM: '', // 支撑国家级科技项目数（个）
                    D_PRO_MINIS_PROJ_NUM: '', // 支撑省部级科技项目数（个）
                    D_PROVINCE_PROJ_NUM: '', // 支撑气象部门省局科技项目数（个）
                    D_PAPER_NUM: '', // 支撑科研论文发表数（个）
                    D_SERVICE_FIELD: '', // 服务企业的领域（个）
                    D_SERVICE_ENTERPRISE: '', // 服务企业个数（个）
                    D_ENTERPRISE_SAVING: '', // 为企业节省的效益（万元）
                    D_PUBLIC_SATIS: '', // 服务公众满意度（百分比）
                    IS_SERVICE_TOOL: '', // 是否提供气象服务
                    D_TOOL: '', // 提供气象服务系统名称
                    D_SERVICE_MATERIAL: '', // 服务政府决策材料数量（个）
                    D_EVENTS_NUM: '', // 保障重大活动次数（次）
                    D_SERVICE_DISASTER: '', // 服务防灾减灾
                    D_SERVICE_CLIMATE: '', // 服务气候资源开发利用
                    D_SERVICE_REGINAL: '', // 服务区域协调发展
                    D_SERVICE_RURAL: '', // 服务乡村振兴
                    D_SERVICE_CIVILISING: '' // 服务生态文明建设
                })
                this.operateDataIndex = this.tableData.length - 1
            }, 0)
            this.addFlag = true
        },
        // 文件上传成功时的钩子
        handleSuccess (response, file, fileList) {
            if (response.retcode === '0') {
                this.$message({
                    dangerouslyUseHTMLString: true,
                    type: 'success',
                    message: `<p>导入成功</p><p>${response.data.success}</p><p>${response.data.fail}</p>`
                });
                this.handleQueryTable()
                this.operateDataIndex = -1
                this.addFlag = false
            } else {
                this.$message.error(response.retmsg)
            }
        },
        // 文件上传失败时的钩子
        handleError () {
            this.$message.error('导入失败，请重试')
        },
        // 下载模板
        handleDownTem () {
            // window.open('http://10.40.25.96:8888/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_SUMMARY.xlsx')
            const href = window.location.origin
            // window.open('http://10.1.64.154/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_DETAIL.xlsx')
            window.open(href + '/MDRSC/esmd/DownloadFile.svt?fileNames=ESMD_INFO_DETAIL.xlsx')
        },
        // 清空
        handleClearData () {
            this.$confirm('点击确定将清空本调查表所有数据，确认清空？', '确认清空', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                this.$notify.closeAll()
                deleteData({
                    TABLE_NAME: 'ESMD_INFO_SUMMARY'
                }).then(res => {
                    if (res.data.retcode === '01') {
                        this.$message.success(res.data.retmsg)
                        this.tableData = []
                        this.handleQueryTable()
                        this.operateDataIndex = -1
                        this.addFlag = false
                    } else {
                            this.$message.error(res.data.retmsg)
                    }
                })
            }).catch(() => {})
        },
        // 编辑
        handleEdit (scope, index) {
            this.oldData = JSON.parse(JSON.stringify(scope))
            this.operateDataIndex = index
            this.addFlag = false
        },
        // 复制
        handleCopy (scope) {
            // TODO 编辑后点复制bug
            if (this.operateDataIndex !== -1) {
                this.tableData.splice(this.operateDataIndex, 1, this.oldData)
            }
            const currentData = JSON.parse(JSON.stringify(scope))
            currentData.D_CHECK_INFO = null
            delete currentData.ID
            this.tableData.push(currentData)
            this.operateDataIndex = this.tableData.length - 1
            this.addFlag = true
        },
        // 必填项检验
        handleValidate (current) {
            this.$notify.closeAll()
            this.validateFlag = false
            const curKeys = current && Object.keys(current)
            let validateInfo = ''
            curKeys && curKeys.forEach(item => {
                if ((current[item] === null || current[item] === '') && Object.keys(this.validateMsg).indexOf(item) > -1) {
                    document.getElementById(item).style.borderColor = '#F56C6C'
                    this.validateFlag = true
                    validateInfo += `<p>${this.validateMsg[item]}为必填项</p>`
                } else {
                    Object.keys(this.validateMsg).indexOf(item) > -1 && (document.getElementById(item).style.borderColor = '#DCDFE6')
                }
            })
            validateInfo !== '' && this.$notify({
                title: '错误提示',
                type: 'error',
                duration: 0,
                dangerouslyUseHTMLString: true,
                message: validateInfo
            });
            return this.validateFlag
        },
        // 保存
        handleSave (scope) {
            if (this.operateDataIndex === -1) {
                this.$message.warning('请操作数据后再进行保存')
            } else {
                const currentData = JSON.parse(JSON.stringify(scope))
                this.handleValidate(currentData)
                if (!this.validateFlag) {
                    if (this.addFlag) {
                        addInsert({
                            TABLE_NAME: 'ESMD_INFO_SUMMARY',
                            ...currentData
                        }).then(res => {
                            if (res.data.retcode === '01') {
                                this.$message.success(res.data.retmsg)
                                // this.tableData = []
                                this.handleQueryTable()
                                this.operateDataIndex = -1
                                this.addFlag = false
                            } else {
                                this.$message.error(res.data.retmsg)
                            }
                        })
                    } else {
                        updateData({
                            TABLE_NAME: 'ESMD_INFO_SUMMARY',
                            ...currentData
                        }).then(res => {
                            if (res.data.retcode === '01') {
                                this.$message.success(res.data.retmsg)
                                // this.tableData = []
                                this.handleQueryTable()
                                this.operateDataIndex = -1
                                this.addFlag = false
                            } else {
                                this.$message.error(res.data.retmsg)
                            }
                        })
                    }
                }
            }
        },
        // 删除
        handleDel (scope) {
            this.$notify.closeAll()
            if (scope.ID) {
                deleteData({
                    TABLE_NAME: 'ESMD_INFO_SUMMARY',
                    ID: scope.ID
                }).then(res => {
                    if (res.data.retcode === '01') {
                        this.$message.success(res.data.retmsg)
                        // this.tableData = []
                        this.handleQueryTable()
                        this.operateDataIndex = -1
                        this.addFlag = false
                    } else {
                            this.$message.error(res.data.retmsg)
                    }
                })
            } else {
                this.tableData.pop()
                this.operateDataIndex = -1
                this.addFlag = false
            }
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
    .upload-demo {
        display: inline-block;
        margin: 0 10px;
        .el-button {
            font-size: 14px;
        }
    }
    .el-table {
        /deep/ .el-table__header {
            width: 100% !important;
            display: none;
        }
        /deep/ .el-table__body {
            width: 100% !important;
        }
        .el-select {
            width: 100%;
        }
    }
    .explain {
        margin-top: 10px;
        padding-left: 23px;
        p {
            margin: 0;
            line-height: 1.5;
            text-align: left;
            color: #f52d2d;
        }
    }
    .operateButton {
        text-align: right;
    }
}
</style>
