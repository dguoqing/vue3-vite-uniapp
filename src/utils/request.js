import { getService } from '@/config'
import { getToken, myToast } from './index'
// type option = {
//     url: string,
//     params ?: any,
//     method ?: "GET" | "POST" | "OPTIONS" | "HEAD" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined,
//     serviceName ?: string,
//     contentType ?: string,
//     showToast ?: boolean //是否显示toast
// }
// import * as Sentry from "sentry-uniapp";

const whiteList = []

function fetch(option) {
    let headers = {
        'Content-Type':
            option.contentType ||
            (option.method === 'POST' || option.method === 'PUT'
                ? 'application/json; charset=utf-8'
                : 'application/x-www-form-urlencoded'),
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    }
    if (getToken()) {
        Object.assign(headers, {
            Authorization: `Bearer ${getToken()}`,
        })
    }
    const url = `${getService(option.serviceName)}${option.url}`
    return new Promise((resolve, reject) => {
        uni.request({
            url,
            data: option.params,
            header: headers,
            method: option.method,
            timeout: option.timeout,
            success: (res) => {
                //TODO:处理逻辑
                if (res.statusCode) {
                }
                if (res.statusCode === 200) {
                    if (whiteList.indexOf(option.url) > -1) {
                        resolve(res.data)
                        return
                    }
                    if (!res.data) {
                        resolve()
                        return
                    }
                    if (res.data === '') {
                        reject(res.data)
                        return
                    }
                    if (res.data.success === undefined) {
                        resolve(res.data)
                        return
                    }
                    if (res.data.success) {
                        resolve(res.data.data)
                        return
                    } else {
                        option.showToast ? myToast(res.data.message || '服务错误') : null
                        reject(res.data)
                    }
                    // Sentry.captureException(new Error(JSON.stringify({
                    // 	url,
                    // 	statusCode:res.statusCode,
                    // 	data: res.data,
                    // 	method: option.method,
                    // })));
                } else {
                    // Sentry.captureException(new Error(JSON.stringify({
                    // 	url,
                    // 	statusCode:res.statusCode,
                    // 	data: option.params,
                    // 	method: option.method,
                    // })));
                }

                if (res.statusCode === 401) {
                    option.showToast ? myToast('token失效，请重新登录') : null
                    uni.clearStorageSync()
                    reject(res.data)
                } else {
                    reject(res.data)
                }
            },
            fail: (err) => {
                reject(err)
                // Sentry.captureException(new Error(JSON.stringify({
                // 	url,
                // 	data: option.params,
                // 	method: option.method,
                // 	response: err
                // })));
            },
        })
    })
}

function get(opt) {
    opt.method = 'GET'
    return fetch(opt)
}

function post(opt) {
    opt.method = 'POST'
    return fetch(opt)
}

export default {
    get,
    post,
    fetch,
}
