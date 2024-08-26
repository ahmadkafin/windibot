const axios = require('axios');

// db
const db = require('../models/')
const Services = db.services;

module.exports = async (mentions) => {
    const data = await Services.findAll();
    let response = await generate(data);
    return `Hello ${mentions}, greetings from service data, this is your data:\n${response}`;
}


/**
 * 
 * @param {Array} data 
 * @returns 
 */
let generate = async (data) => {
    let arrdata = [];
    let x = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i].isEnable) {
            arrdata.push(await checkServices(data[i].url, x));
        } else {
            continue;
        }
    }
    return arrdata.join("");
}


/**
 * 
 * @param {String} rawurl 
 * @param {Number} i 
 * @returns 
 */
let checkServices = async (rawurl, i) => {
    let url = rawurl.includes('?') ? `${rawurl}&f=pjson` : `${rawurl}?f=pjson`;
    let res = await axios.get(url, { timeout: 5000 })
        .then(response => {
            console.log(`checking ${rawurl} : passed`)
        }).catch(e => {
            z = i + 1;
            if (e.code === 'ECONNABORTED') {
                console.log(`${rawurl} is ${e.code} - REQUEST TIMEOUT`);
                return `${z}. ${rawurl} is ${e.code} - REQUEST TIMEOUT\n`;
            } else {
                console.log(`${rawurl} is ${e.code} - ${e.response.status}`);
                return `${z}. ${rawurl} is ${e.code} - ${e.response.status}\n`;
            }
        })
    return res;
}