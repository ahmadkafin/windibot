const cctv = require('./cctv.utils')
const page = require('./page.utils')
const server = require('./server.utils')
const service = require('./service.utils')

exports.cctv = (mentions) => {
    return cctv(mentions)
}

exports.page = (mentions) => {
    return page(mentions)
}

exports.server = (mentions) => {
    return server(mentions)
}

exports.service = (mentions) => {
    return service(mentions);
}