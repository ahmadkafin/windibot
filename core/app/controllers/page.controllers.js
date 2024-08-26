const response = require('../common/response.common')

// DB
const db = require('../models/')
const Page = db.page;

exports.GET = async (req, res) => {
    let data = await db.sequelize.query("SELECT * FROM APP_PGN.pgn.digio_menu", {
        model: Page,
        mapToModel: true
    });
    res.status(200).json({
        data: data
    });
    res.end();
}