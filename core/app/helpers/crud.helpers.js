const response = require('../common/response.common')

/**
 * @param {*} req
 * @param {*} res
 * @param {Function} Model
 * @param {Object} clause
 */
const read = async (req, res, Model, clause) => {
    await Model.findAll(clause)
        .then(data => {
            res.status(200).json({
                status: 200,
                data: data,
            });
        }).catch(err => {
            res.status(500).json(
                response.INTERNAL_SERVER_ERROR(err.message)
            );
            res.end();
        });
}


/**
 * @param {*} req
 * @param {*} res
 * @param {Function} Model
 * @param {Object} clause
 */
const find = async (req, res, Model, clause) => {
    await Model.findOne(clause)
        .then((found) => {
            if (!found) {
                res.status(404)
                    .json(response.NOT_FOUND("Not Found"));
            } else {
                res.status(200)
                    .json({
                        status: 200,
                        data: found
                    });
            }
            res.end();
        }).catch(err => {
            res.status(500)
                .json(response.INTERNAL_SERVER_ERROR(err.message));
            res.end();
        })
}

/**
 * @param {*} req
 * @param {*} res
 * @param {Object} value
 * @param {Object} clause
 * @param {Function} Model
 */
const create = async (req, res, clause, value, Model) => {
    await Model.findOne(clause)
        .then(async (found) => {
            if (!found) {
                await Model.create(value)
                    .then((response) => {
                        res.status(201)
                            .json({
                                status: 201,
                                type: response,
                                message: "successfully added"
                            });
                        res.end();
                    }).catch(err => {
                        res.status(500)
                            .json(response.INTERNAL_SERVER_ERROR(err.message));
                        res.end();
                    })
            } else {
                res.status(409)
                    .json({
                        status: 409,
                        type: "Conflict",
                        message: "Conflict Exception : This data has been inserted into database"
                    });
                res.end();
            }
        })
}

/**
 * @param {*} req
 * @param {*} res
 * @param {Object} clause
 * @param {Function} Model
 */
const remove = async (req, res, clause, Model) => {
    await Model.destroy(clause)
        .then((response) => {
            res.status(204)
                .json({
                    status: 204,
                    type: response,
                    message: "successfully deleted"
                });
            res.end();
        }).catch(err => {
            res.status(500)
                .json(response.INTERNAL_SERVER_ERROR(err.message));
            res.end();
        });
}

module.exports = { read, find, create, remove };