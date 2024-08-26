require('dotenv').config();
const fs = require('fs');
const child_process = require('child_process');

// DB
const db = require('../models/')
const Cctv = db.cctv

/**
 * 
 */
exports.index = async () => {
    let data = await Cctv.findAll();
    // return data;
    for (let i = 0; i < data.length; i++) {
        await isFileIsExists(data[i].name)
            .then(async () => {
                readrtsp(data, i);
            }).catch(e => {
                console.log(e);
            })
    }
}

/**
 * 
 * @param {Array} data 
 * @param {Number} x 
 */
let readrtsp = async (data, x) => {
    if (x === data.length) {
        process.exit(0);
    }

    let name = data[x].name.replace(' ', '');
    child_process.spawnSync('cmd', [`start cmd.exe /k ffmpeg -loglevel error -rtsp_transport tcp -timeout 300000 -i ${data[x].rtsp} -f image2 -vf fps=fps=1 ${process.env.DRIVE_PATH}\\STREAM\\${name}.bmp`]);
    console.info(`adding file ${data[x].name}`);
}

/**
 * 
 * @param {String} namestation 
 */
let isFileIsExists = async (namestation) => {
    if (fs.existsSync(`${process.env.DRIVE_PATH}\\STREAM\\${namestation.replace(" ", "")}.bmp`)) {
        console.info(`data ${namestation.replace(" ", "")}.bmp is exist!`);
        console.warn('removing file');
        fs.unlinkSync(`${process.env.DRIVE_PATH}\\STREAM\\${namestation.replace(" ", "")}.bmp`);
    } else {
        console.error(`data ${namestation.replace(" ", "")}.bmp is not exist`)
    }
}