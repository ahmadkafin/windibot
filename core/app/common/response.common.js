exports.BAD_REQUEST = (message) => {
    return {
        status: 400,
        type: "BAD REQUEST",
        message: message
    }
}

exports.INTERNAL_SERVER_ERROR = (message) => {
    return {
        status: 500,
        type: "INTERNAL SERVER ERROR",
        message: message
    }
}

exports.NOT_FOUND = (message) => {
    return {
        status: 404,
        type: "NOT FOUND",
        message: message
    }
}