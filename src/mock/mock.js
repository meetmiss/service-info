// 单位类别
export const unitTypeList = [{
    code: '0',
    text: '国家级'
}, {
    code: '1',
    text: '省级'
}, {
    code: '2',
    text: '市级'
}, {
    code: '3',
    text: '县级'
}]

// 通信方式
export const serviceModeList = [{
    code: '0',
    text: '离线'
}, {
    code: '1',
    text: '互联网'
}, {
    code: '2',
    text: '专线'
}, {
    code: '3',
    text: '政务外网'
}]
// 服务方式
export const serveModeList = [{
    code: '0',
    text: 'FTP文件传输'
}, {
    code: '1',
    text: 'API接口'
}, {
    code: '2',
    text: '提供平台或客户端浏览'
}, {
    code: '3',
    text: '其他'
}]

// 服务类型
export const serviceTypeList = [{
    code: '0',
    text: '一次性'
}, {
    code: '1',
    text: '持续性'
}]

// 服务对象类别
export const serviceUnitTypeList = [{
    code: '0',
    text: '政府'
}, {
    code: '1',
    text: '部门'
}, {
    code: '2',
    text: '企业'
}, {
    code: '3',
    text: '学校'
}, {
    code: '4',
    text: '科研'
}, {
    code: '5',
    text: '其他'
}]

// 资料类别
export const cotegoryList = [{
    code: '0',
    text: '地面资料'
}, {
    code: '1',
    text: '高空资料'
}, {
    code: '2',
    text: '海洋资料'
}, {
    code: '3',
    text: '辐射资料'
}, {
    code: '4',
    text: '农气资料'
}, {
    code: '5',
    text: '数值模式'
}, {
    code: '6',
    text: '大气成分'
}, {
    code: '7',
    text: '历史代用'
}, {
    code: '8',
    text: '气象灾害'
}, {
    code: '9',
    text: '雷达资料'
}, {
    code: '10',
    text: '卫星资料'
}, {
    code: '11',
    text: '科考资料'
}, {
    code: '12',
    text: '服务产品'
}, {
    code: '13',
    text: '其他资料'
}]

// 收费
export const chargeList = [{
    code: '0',
    text: '否'
}, {
    code: '1',
    text: '是'
}]

// 有独资或合资的涉及数据服务的公司情况
export const companyList = [{
    code: '0',
    text: '无'
}, {
    code: '1',
    text: '有'
}]

// 公司性质
export const companyTypeList = [{
    code: '0',
    text: '独资'
}, {
    code: '1',
    text: '合资'
}]

// 公司性质
export const ventureTypeList = [{
    code: '0',
    text: '国营'
}, {
    code: '1',
    text: '私营'
}]

// 单位级别
export const D_DEPART_LEVEL = [{
    code: '0',
    text: '国家级'
}, {
    code: '1',
    text: '省级'
}]

// 政策完备度-1
export const IS_SHARE_POLICY = [{
    code: '0',
    text: '否'
}, {
    code: '1',
    text: '是'
}]

// 数据资源可得性-1
export const IS_BUILD_PLATFORM = [{
    code: '0',
    text: '否'
}, {
    code: '1',
    text: '是'
}]

// 数据资源可得性-3
export const D_DATADOWN_MODE = [{
    code: '0',
    text: '订单'
}, {
    code: '1',
    text: '离线'
}, {
    code: '2',
    text: 'FTP'
}, {
    code: '3',
    text: 'TDS'
}, {
    code: '4',
    text: 'API接口'
}, {
    code: '5',
    text: '客户端'
}]

// 公众民生普惠力-2
export const IS_SERVICE_TOOL = [{
    code: '0',
    text: '否'
}, {
    code: '1',
    text: '是'
}]

// 汇总信息
export const summaryList = [{
    category: '操作',
    activityPointsDOS: []
},
{
    category: "单位信息",
    activityPointsDOS: [
        {
            activityPointsDOS: [],
            activityName: "单位名称",
            keyName: 'D_DEPART_NAME',
            keyValue: 'test1',
            message: '测试1',
            type: 'input'
        },
        {
            activityPointsDOS: [],
            activityName: "单位级别（国家级/省级）",
            keyName: 'D_DEPART_LEVEL',
            keyValue: 'test2',
            message: '测试2',
            type: 'select'
        }
    ]
},
{
    category: "政策规范",
    activityPointsDOS: [
        {
            activityName: "政策完备度",
            activityPointsDOS: [
                {
                    keyName: 'IS_SHARE_POLICY',
                    keyValue: "6",
                    activityName: "政策完备度",
                    message: "本单位是否出台了数据共享相关政策（如选择“是”，需列出具体数量及所有相关政策）",
                    period: "19上半年",
                    type: 'select'
                }, {
                    keyName: 'D_POLICY_NUM',
                    keyValue: "6",
                    activityName: "政策完备度",
                    message: "数据共享相关政策数量",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_POLICY',
                    keyValue: "6",
                    activityName: "政策完备度",
                    message: "数据共享相关政策",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        },
        {
            activityName: "政策适用性",
            activityPointsDOS: [
                {
                    keyName: 'D_DATA_SHARE_SCOPE',
                    keyValue: "7",
                    activityName: "政策适用性",
                    message: "现有数据共享政策适用范围（适用于全省气象部门/适用于部分气象部门/全部适用于相关行业和领域/适用于部分行业和领域）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        }
    ]
},
{
    category: "数据资源",
    activityPointsDOS: [
        {
            activityName: "数据资源丰富度",
            activityPointsDOS: [
                {
                    keyName: 'D_STORAGE_NUM',
                    keyValue: "6",
                    activityName: "数据资源丰富度",
                    message: "存储的数据产品数量（个）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        },
        {
            activityName: "数据资源完整性",
            activityPointsDOS: [
                {
                    keyName: 'D_STORAGE_SIZE',
                    keyValue: "7",
                    activityName: "数据资源完整性",
                    message: "存储的数据产品总量（TB）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        }
    ]
},
{
    category: "数据共享",
    activityPointsDOS: [
        {
            activityName: "数据共享度",
            activityPointsDOS: [
                {
                    keyName: 'D_OPENSHARING_NUM',
                    keyValue: "6",
                    activityName: "数据共享度",
                    message: "开放共享的数据产品数量（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_OPENSHARING_SIZE',
                    keyValue: "6",
                    activityName: "数据共享度",
                    message: "数据开放共享总量（TB）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_SHARE_CLOUD_SIZE',
                    keyValue: "6",
                    activityName: "数据共享度",
                    message: "数据在云端的共享量（TB）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        },
        {
            activityName: "行业部门共享程度",
            activityPointsDOS: [
                {
                    keyName: 'D_SHARE_NUM',
                    keyValue: "6",
                    activityName: "行业部门共享程度",
                    message: "参与数据交换的行业部门数量（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_SHARE_SIZE',
                    keyValue: "6",
                    activityName: "行业部门共享程度",
                    message: "行业部门间数据交换总量（TB）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_COLLECTION_NUM',
                    keyValue: "6",
                    activityName: "行业部门共享程度",
                    message: "数据汇交行业部门数量（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_COLLECTION_SIZE',
                    keyValue: "6",
                    activityName: "行业部门共享程度",
                    message: "数据汇交总量（TB）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_ISSUE_NUM',
                    keyValue: "6",
                    activityName: "行业部门共享程度",
                    message: "数据分发行业部门数量（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_ISSUE_SIZE',
                    keyValue: "6",
                    activityName: "行业部门共享程度",
                    message: "数据分发总量（TB）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        },
        {
            activityName: "全球共享程度",
            activityPointsDOS: [
                {
                    keyName: 'D_GLOBAL_SIZE',
                    keyValue: "6",
                    activityName: "全球共享程度",
                    message: "全球数据交换量（TB）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_MONITOR_REPORT_NUM',
                    keyValue: "6",
                    activityName: "全球共享程度",
                    message: "遥感监测报告数（期）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_FYSAT_COUNTRY_NUM',
                    keyValue: "6",
                    activityName: "全球共享程度",
                    message: "应用风云卫星数据的国家数（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_SERVICE_COUNTRY_NUM',
                    keyValue: "6",
                    activityName: "全球共享程度",
                    message: "气象数据服务一带一路国家数（个）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        },
        {
            activityName: "数据资源可得性",
            activityPointsDOS: [
                {
                    keyName: 'IS_BUILD_PLATFORM',
                    keyValue: "6",
                    activityName: "数据资源可得性",
                    message: "是否建设数据共享平台（如选择“是”，需列出共享平台名称及地址）",
                    period: "19上半年",
                    type: 'select'
                }, {
                    keyName: 'D_PLATFORM',
                    keyValue: "6",
                    activityName: "数据资源可得性",
                    message: "共享平台名称及地址",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_DATADOWN_MODE',
                    keyValue: "6",
                    activityName: "数据资源可得性",
                    message: "数据共享平台下载方式（订单/离线/FTP/API接口等）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_VISIT_NUM',
                    keyValue: "6",
                    activityName: "数据资源可得性",
                    message: "数据共享平台访问量（万次）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_CUSTOMER_NUM',
                    keyValue: "6",
                    activityName: "数据资源可得性",
                    message: "数据共享平台用户数（万个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_SERVICE_SIZE',
                    keyValue: "6",
                    activityName: "数据资源可得性",
                    message: "数据平台数据服务量（TB）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_DATADOWN_NUM',
                    keyValue: "6",
                    activityName: "数据资源可得性",
                    message: "数据平台下载次数（万次）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        }
    ]
},
{
    category: "服务效益",
    activityPointsDOS: [
        {
            activityName: "科技研发支撑力",
            activityPointsDOS: [
                {
                    keyName: 'D_COUNTRY_PROJ_NUM',
                    keyValue: "6",
                    activityName: "科技研发支撑力",
                    message: "支撑国家级科技项目数（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_PRO_MINIS_PROJ_NUM',
                    keyValue: "6",
                    activityName: "科技研发支撑力",
                    message: "支撑省部级科技项目数（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_PROVINCE_PROJ_NUM',
                    keyValue: "6",
                    activityName: "科技研发支撑力",
                    message: "支撑气象部门省局科技项目数（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_PAPER_NUM',
                    keyValue: "6",
                    activityName: "科技研发支撑力",
                    message: "支撑科研论文发表数（个）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        },
        {
            activityName: "创新创业贡献力",
            activityPointsDOS: [
                {
                    keyName: 'D_SERVICE_FIELD',
                    keyValue: "6",
                    activityName: "创新创业贡献力",
                    message: "服务企业的领域（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_SERVICE_ENTERPRISE',
                    keyValue: "6",
                    activityName: "创新创业贡献力",
                    message: "服务企业个数（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_ENTERPRISE_SAVING',
                    keyValue: "6",
                    activityName: "创新创业贡献力",
                    message: "为企业节省的效益（万元）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        },
        {
            activityName: "公众民生普惠力",
            activityPointsDOS: [
                {
                    keyName: 'D_PUBLIC_SATIS',
                    keyValue: "6",
                    activityName: "公众民生普惠力",
                    message: "服务公众满意度（百分比）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'IS_SERVICE_TOOL',
                    keyValue: "6",
                    activityName: "公众民生普惠力",
                    message: "是否借助手机客户端/微信公众号等提供气象服务（如选择“是”，需列出具体名称）",
                    period: "19上半年",
                    type: 'select'
                }, {
                    keyName: 'D_TOOL',
                    keyValue: "6",
                    activityName: "公众民生普惠力",
                    message: "提供气象服务系统名称",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_SERVICE_MATERIAL',
                    keyValue: "6",
                    activityName: "公众民生普惠力",
                    message: "服务政府决策材料数量（个）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_EVENTS_NUM',
                    keyValue: "6",
                    activityName: "公众民生普惠力",
                    message: "保障重大活动次数（次）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        },
        {
            activityName: "重大战略保障力",
            activityPointsDOS: [
                {
                    keyName: 'D_SERVICE_DISASTER',
                    keyValue: "6",
                    activityName: "重大战略保障力",
                    message: "服务防灾减灾（列举所做举措及成效）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_SERVICE_CLIMATE',
                    keyValue: "6",
                    activityName: "重大战略保障力",
                    message: "服务气候资源开发利用（列举所做举措及成效）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_SERVICE_REGINAL',
                    keyValue: "6",
                    activityName: "重大战略保障力",
                    message: "服务区域协调发展（列举所做举措及成效）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_SERVICE_RURAL',
                    keyValue: "6",
                    activityName: "重大战略保障力",
                    message: "服务乡村振兴（列举所做举措及成效）",
                    period: "19上半年",
                    type: 'input'
                }, {
                    keyName: 'D_SERVICE_CIVILISING',
                    keyValue: "6",
                    activityName: "重大战略保障力",
                    message: "服务生态文明建设（列举所做举措及成效）",
                    period: "19上半年",
                    type: 'input'
                }
            ]
        }
    ]
}]

// 汇总表错误信息
export const summaryErrInfo = {
    // D_CHECK_INFO: '', // 校验信息
    D_DEPART_NAME: '单位名称', // 单位名称
    D_DEPART_LEVEL: '单位级别', // 单位级别（国家级/省级）
    IS_SHARE_POLICY: '本单位是否出台了数据共享相关政策', // 是否出台了数据共享相关政策
    D_POLICY_NUM: '数据共享相关政策数量', // 数据共享相关政策数量
    D_POLICY: '数据共享相关政策', // 数据共享相关政策
    D_DATA_SHARE_SCOPE: '现有数据共享政策适用范围', // 现有数据共享政策适用范围
    D_STORAGE_NUM: '存储的数据产品数量', // 存储的数据产品数量（个）
    D_STORAGE_SIZE: '存储的数据产品总量', // 存储的数据产品总量（TB）
    D_OPENSHARING_NUM: '开放共享的数据产品数量', // 开放共享的数据产品数量（个）
    D_OPENSHARING_SIZE: '数据开放共享总量', // 数据开放共享总量（TB）
    D_SHARE_CLOUD_SIZE: '数据在云端的共享量', // 数据在云端的共享量（TB）
    D_SHARE_NUM: '参与数据交换的行业部门数量', // 参与数据交换的行业部门数量（个）
    D_SHARE_SIZE: '行业部门间数据交换总量', // 行业部门间数据交换总量（TB）
    D_COLLECTION_NUM: '数据汇交行业部门数量', // 数据汇交行业部门数量（个）
    D_COLLECTION_SIZE: '数据汇交总量', // 数据汇交总量（TB）
    D_ISSUE_NUM: '数据分发行业部门数量', // 数据分发行业部门数量（个）
    D_ISSUE_SIZE: '数据分发总量', // 数据分发总量（TB）
    D_GLOBAL_SIZE: '全球数据交换量', // 全球数据交换量（TB）
    D_MONITOR_REPORT_NUM: '遥感监测报告数', // 遥感监测报告数（期）
    D_FYSAT_COUNTRY_NUM: '应用风云卫星数据的国家数', // 应用风云卫星数据的国家数（个）
    D_SERVICE_COUNTRY_NUM: '气象数据服务一带一路国家数', // 气象数据服务一带一路国家数（个）
    IS_BUILD_PLATFORM: '是否建设数据共享平台', // 是否建设数据共享平台
    D_PLATFORM: '共享平台名称及地址', // 共享平台名称及地址
    D_DATADOWN_MODE: '数据共享平台下载方式', // 数据共享平台下载方式
    D_VISIT_NUM: '数据共享平台访问量', // 数据共享平台访问量（万次）
    D_CUSTOMER_NUM: '数据共享平台用户数', // 数据共享平台用户数（万个）
    D_SERVICE_SIZE: '数据平台数据服务量', // 数据平台数据服务量（TB）
    D_DATADOWN_NUM: '数据平台下载次数', // 数据平台下载次数（万次）
    D_COUNTRY_PROJ_NUM: '支撑国家级科技项目数', // 支撑国家级科技项目数（个）
    D_PRO_MINIS_PROJ_NUM: '支撑省部级科技项目数', // 支撑省部级科技项目数（个）
    D_PROVINCE_PROJ_NUM: '支撑气象部门省局科技项目数', // 支撑气象部门省局科技项目数（个）
    D_PAPER_NUM: '支撑科研论文发表数', // 支撑科研论文发表数（个）
    D_SERVICE_FIELD: '服务企业的领域', // 服务企业的领域（个）
    D_SERVICE_ENTERPRISE: '服务企业个数', // 服务企业个数（个）
    D_ENTERPRISE_SAVING: '为企业节省的效益', // 为企业节省的效益（万元）
    D_PUBLIC_SATIS: '服务公众满意度', // 服务公众满意度（百分比）
    IS_SERVICE_TOOL: '是否借助手机客户端/微信公众号等提供气象服务', // 是否提供气象服务
    D_TOOL: '提供气象服务系统名称', // 提供气象服务系统名称
    D_SERVICE_MATERIAL: '服务政府决策材料数量', // 服务政府决策材料数量（个）
    D_EVENTS_NUM: '保障重大活动次数', // 保障重大活动次数（次）
    D_SERVICE_DISASTER: '服务防灾减灾', // 服务防灾减灾
    D_SERVICE_CLIMATE: '服务气候资源开发利用', // 服务气候资源开发利用
    D_SERVICE_REGINAL: '服务区域协调发展', // 服务区域协调发展
    D_SERVICE_RURAL: '服务乡村振兴', // 服务乡村振兴
    D_SERVICE_CIVILISING: '服务生态文明建设' // 服务生态文明建设
}

// 详表错误信息
export const detailErrInfo = {
    // D_CHECK_INFO: '', // 校验信息
    D_DEPART_NAME: '单位信息-单位名称', // 单位名称
    D_DEPART_LEVEL: '单位信息-单位类别', // 单位类别
    D_SERVICE_MODE: '通信方式', // 通信方式
    D_SERVICE_TYPE: '服务类型', // 服务类型
    D_SERVICE_START_DATE: '服务开始时间', // 服务开始时间
    D_SERVICE_END_DATE: '服务结束时间', // 服务结束时间
    D_SERVICE_OBJ_NAME: '服务对象-单位名称', // 单位名称-服务对象
    D_SERVICE_OBJ_TYPE: '服务对象-类别', // 类别-服务对象
    D_DATA_TYPE: '资料类别', // 资料类别
    D_DATA_CONTENT: '资料内容', // 资料内容
    D_DATA_START_DATE: '资料开始时间', // 资料开始时间
    D_DATA_END_DATE: '资料结束时间', // 资料结束时间
    IS_CHARGE: '是否收费', // 是否收费
    IS_SERVICE_COMPANY: '是否有独资或合资的涉及数据服务的公司情况', // 是否有独资或合资的涉及数据服务的公司情况
    DATA_SERVICE_COMPANYNAME: '公司名称', // 公司名称
    COMPANY_NATURE: '公司性质', // 公司性质
    JOINT_DEPART_NAME: "合资单位名称", // 合资单位名称
    JOINT_DEPART_NATURE: "合资单位性质", // 合资单位性质
    JOINT_PROPORTION: "各合资单位股份占比", // 各合资单位股份占比
    // D_MOME: '备注', // 备注
    DATA_SERVICE_CONDITION: '公司数据服务情况' // 是否有独资或合资的涉及数据服务的公司情况
}
