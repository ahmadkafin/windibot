const controllers = require('../controllers/');
const Page = controllers.page

const cmn = require('../common/basepath.common')

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "X-Access-Token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(`${cmn.base_path}/page/`, Page.GET);
    // app.post(`${cmn.base_path}/page/sendmsg`, Page.sendMessage);
} 