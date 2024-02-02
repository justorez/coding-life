import axios from 'axios'
import ProgressBar from 'progress'
import fs from 'fs'

const api = axios.create({
    baseURL: 'http://127.0.0.1:3333',
    maxBodyLength: 2 * 1024 * 1024 * 1024,
    maxContentLength: 2 * 1024 * 1024 * 1024
})
api.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.message)
)

function fileUpload() {
    const filePath = ''
    const fileData = fs.readFileSync(filePath)

    const bar = new ProgressBar('正在上传 [:bar] :rate/bps :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 20,
        total: fileData.byteLength
    })

    api.post('/up/', fileData, {
        onUploadProgress(event) {
            console.log(event) // node 环境下进度不是真实的
        },
        headers: {
            'Content-Type': 'video/mp4'
        }
    }).then(console.log, console.error)
}

fileUpload()
