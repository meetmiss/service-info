import service from '@/utils/service.js';

// 查询
export const queryLoad = (params) => {
    return service({
        url: `/MDRSC/api/rest/WebInterface/load`,
        method: 'Get',
        params: params
    })
}
// 新增
export const addInsert = (params) => {
    return service({
        url: '/MDRSC/api/rest/WebInterface/insert',
        method: 'Get',
        params: params
    })
}
// 修改
export const updateData = (params) => {
    return service({
        url: '/MDRSC/api/rest/WebInterface/update',
        method: 'Get',
        params
    })
}
// 删除/清空（不传id）
export const deleteData = (params) => {
    return service({
        url: '/MDRSC/api/rest/WebInterface/del',
        method: 'Get',
        params
    })
}

// 登录-获取用户信息
export const login = () => {
    return service({
        url: '/MDRSC/api/rest/register/getLoginInfo',
        method: 'Get'
    })
}
// 提交流程
export const submit = () => {
    return service({
        url: '/MDRSC/api/rest/WebInterface/submit',
        method: 'Get'
    })
}
