const controllers = require('../controllers/');
const Cctv = controllers.cctv

const cmn = require('../common/basepath.common')

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "X-Access-Token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(`${cmn.base_path}/cctv/`, Cctv.GET);
    app.post(`${cmn.base_path}/cctv/sendmsg`, Cctv.sendMessage);
} 