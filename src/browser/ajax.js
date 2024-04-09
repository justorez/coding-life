const typeOf = (val) => Object.prototype.toString.call(val).slice(8, -1)
const isBoolean = (val) => typeOf(val) === 'Boolean'
const isObject = (val) => val !== null && typeof val === 'object'

/**
 * ajax
 * @param {Object} options 配置项
 * @param {string} options.method 请求方法
 * @param {string} options.url 请求地址
 * @param {Object} options.params 请求参数
 * @param {array} options.headers 自定义请求头
 * @param {boolean} options.withCredentials 跨域携带授权信息
 * @returns Request Promise
 */
function ajax({ method, url, params, headers, withCredentials } = {}) {
    method = method.toUpperCase()
    withCredentials = isBoolean(withCredentials) ? withCredentials : true

    if (method === 'GET') {
        const query = new URLSearchParams(params)
        url = `${url}?${query}`
    }

    if (method === 'POST' && isObject(params)) {
        params = JSON.stringify(params)
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(type, url, true)
        xhr.withCredentials = withCredentials
        Object.keys(headers).forEach((key) => {
            xhr.setRequestHeader(key, headers[key])
        })
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                reject(new Error('Network error'))
                return
            }
            if (xhr.status === 200 || xhr.status === 304) {
                resolve(xhr.responseText)
            } else {
                reject(new Error(xhr.responseText))
            }
        }
        xhr.send(params)
    })
}
