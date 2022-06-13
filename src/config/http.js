const axios = require("axios")

const http = axios.create({
    baseURL: "http://185.209.179.253:7900",
    headers: {
        "Accept": "application/json",
        "Accept": "multipart/form-data",
        "Content": "application/json",
        'Content': 'multipart/form-data'
    }
})

module.exports = http