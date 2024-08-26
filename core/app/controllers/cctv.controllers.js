const response = require('../common/response.common')
const sockWa = require('../utils/waConnection.utils');


// DB
const db = require('../models');
const Cctv = db.cctv

// helpers
const helpers = require('../helpers')
const crud = helpers.crud

const Op = db.Sequelize.Op

/**
 * @param {*} req
 * @param {*} res
 */

exports.GET = async (req, res) => {
    await crud.read(req, res, Cctv)
}

exports.sendMessage = async (req, res) => {
    const id = '6281312425757@s.whatsapp.net';
    await sockWa.sendmsg(id, "hello from api new");
    res.status(200);
    res.end();
}