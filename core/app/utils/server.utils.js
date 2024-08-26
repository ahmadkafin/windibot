const ping = require('ping')

module.exports = async (mentions) => {
    let response = await generate();
    return `Hello ${mentions}, greetings from server data, this is your data :\n${response}`;
}

/**
 * 
 * @returns 
 */
let server = () => {
    return [
        { ip: '10.129.18.150', isEnable: true },
        { ip: '10.129.18.153', isEnable: true },
        { ip: '10.129.18.154', isEnable: true },
        { ip: '10.129.18.155', isEnable: false },
        { ip: '10.129.18.159', isEnable: false },
        { ip: '10.129.18.45', isEnable: true },
        { ip: '10.129.18.46', isEnable: true },
        { ip: '10.129.18.47', isEnable: true },
        { ip: '10.129.18.48', isEnable: true },
        { ip: '10.129.18.49', isEnable: true },
        { ip: '10.129.18.203', isEnable: true },
        { ip: '10.129.10.131', isEnable: true },
        { ip: '10.129.10.132', isEnable: true },
        { ip: '10.129.10.133', isEnable: true },
        { ip: '10.129.10.134', isEnable: true },
        { ip: '10.129.10.135', isEnable: true },
        { ip: '10.129.10.136', isEnable: true },
        { ip: '10.129.10.137', isEnable: true },
        { ip: '10.129.10.138', isEnable: true },
        { ip: '10.129.10.139', isEnable: true },
        { ip: '10.129.10.140', isEnable: true },
    ]
}

let generate = async () => {
    let resdata = [];
    let data = server();
    let x = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].isEnable) {
            // resdata.push(`${x + 1}. ${data[i].ip}\n`)
            let res = await pingServer(data[i].ip)
            resdata.push(`${x+=1}. ${data[i].ip} is ${res.alive ? 'up' : 'down'}\n`)
        }
    }
    return resdata.join("");
}

let pingServer = async (data) => {
    let response = await ping.promise.probe(data, { timeout: 5 });
    console.log(`ping ${data} - ${response.alive}`)
    return response;
} 