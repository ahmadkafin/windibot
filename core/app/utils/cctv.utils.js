require('dotenv').config();
const fs = require('fs');
const child_process = require('child_process');

// models
const db = require('../models/')
const Cctv = db.cctv


module.exports = async (mentions) => {
    const data = await Cctv.findAll()
    return `Hello ${mentions}, greetings from cctv data this is your data :\n${await checkkcctv(data)}`
}


/**
 * 
 * @param {Array} data 
 */
let checkkcctv = async (data) => {
    let arraydata = [];
    let x = 1;
    for (let i = 0; i < data.length; i++) {
        let resData = await readData(data[i].name);
        if (resData) {
            arraydata.push(`${x++}. ${data[i].name} is on\n`)
        }
        console.log(`${data[i].name} - ${resData}`);
    }
    return arraydata.join("");
}

/**
 * 
 * @param {String} nameStation 
 * @returns 
 */
let readData = async (nameStation) => {
    let read = fs.existsSync(`${process.env.DRIVE_PATH}\\STREAM\\${nameStation.replace(" ", "")}.bmp`);
    return read;
}