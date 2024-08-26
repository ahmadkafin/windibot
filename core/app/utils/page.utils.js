let axios = require('axios')

// DB
const db = require('../models/')
const Page = db.page;

module.exports = async (mentions) => {
    const data = await db.sequelize.query("SELECT * FROM APP_PGN.pgn.digio_menu where url LIKE '%.aspx%'", {
        model: Page,
        mapToModel: true
    });
    let response = await generate(data);
    return `Hello ${mentions}, greetings from page data, this is your data :\n${response}`
}


/**
 * 
 * @param {Array} data 
 * @returns 
 */
let generate = async (data) => {
    let arrdata = [];
    let token = await tokenauth();
    for (let i = 0; i < data.length; i++) {
        let url = data[i].url;
        url = url.includes('?') ? `http://10.129.10.138/digio2021/${url}&token=${token}` : `http://10.129.10.138/digio2021/${url}?token=${token}`;
        checkPage(url, i).then((res) => {
            arrdata.push(res);
        })
    }
    return arrdata.join("");
}

/**
 * 
 * @param {String} url 
 */
let checkPage = async (url, i) => {
    const header = {
        'url-references': ['https://gis.pgn.co.id', 'http://10.129.10.138']
    }
    await axios.get(url, { timeout: 5000 }, { header: header })
        .then(res => {
            let resurl = res.config.url;
            resurl = resurl.substring(0, resurl.indexOf('token='));
            if (res.data.hasOwnProperty('error')) {
                return `${i + 1}. ${resurl} is ${res.data.error.code} - ${res.data.error.message}\n`;
            }
            return null;
        })
        .catch(err => {
            console.log(`${url} -> cannot be open`);
        })
}


let tokenauth = async () => {
    let token = await axios.post(
        'https://gis.pgn.co.id/digio2021/digiohandlers/TokenAuth.ashx',
        {
            username: 'ahmad.kafin-e',
            password: 'Sup3rm4n1791!@',
            dir: 'pertamina'
        }
    );
    return token.data.accessToken;
}