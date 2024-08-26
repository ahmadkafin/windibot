const { DisconnectReason, useMultiFileAuthState, MessageType, MessageOptions, Mimetype, delay } = require('@whiskeysockets/baileys');
const makeWaSocket = require('@whiskeysockets/baileys').default;
const utils = require('./index')

let connectionToWhatsapp = async () => {
    const { state, saveCreds } = await useMultiFileAuthState('./auth_info/');
    const sock = makeWaSocket({
        printQRInTerminal: true,
        auth: state,
        syncFullHistory: false,
        defaultQueryTimeoutMs: undefined,
        version: [2, 3000, 1015901307],
    });

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect, qr } = update || {};
        if (qr) {
            console.log(qr);
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.statusCode != DisconnectReason.loggedOut;
            if (shouldReconnect) {
                connectionToWhatsapp();
            } else if (DisconnectReason.connectionClosed) {
                this.connectionToWhatsapp;
            }
        } else if (connection === 'open') {
            console.log('\n\nOpened Connection');
        }
    });

    // sock.ev.on('messages.upsert', async (msgupsert) => {
    //     console.log(JSON.stringify(msgupsert, undefined, 2))
    //     console.log(msgupsert.messages[0].key.remoteJid)
    //     console.log(msgupsert.messages[0].message.conversation)
    //     console.log(msgupsert.messages[0].pushName)
    //     console.log(msgupsert.messages[0].key.fromMe)
    // });

    // command for windi
    sock.ev.on('messages.upsert', async (msgupsert) => {
        await chatsCondition(msgupsert.messages[0].message.conversation, sock, msgupsert)
            .catch(e => console.log(e));
        // console.log(msgupsert.messages[0]);
        // console.log(msgupsert.messages[0].key);
        // console.log(msgupsert.messages[0].message);
        // const id = msgupsert.messages[0].key.remoteJid;
        // const participant = msgupsert.messages[0].key.participant === undefined ? msgupsert.messages[0].key.remoteJid : msgupsert.messages[0].key.participant;
        // const mention = msgupsert.messages[0].key.participant === undefined ? `@${id.replace('@s.whatsapp.net', '')}` : `@${participant.replace('@s.whatsapp.net', '')}`
    
        // await sock.sendMessage(msgupsert.messages[0].key.remoteJid,
        //     {text: `Helo ${mention} i'm awake`, mentions: [participant]});

    })
    return sock;
}


/**
 * Chats condition for determine wich the reply should send
 * @param {*} convo 
 * @param {*} sock 
 * @param {*} msgupsert 
 * @returns 
 */
const chatsCondition = async (convo, sock, msgupsert) => {
    const participant = msgupsert.messages[0].key.participant === undefined ? msgupsert.messages[0].key.remoteJid : msgupsert.messages[0].key.participant;
    const mention = msgupsert.messages[0].key.participant === undefined ? `@${msgupsert.messages[0].key.remoteJid.replace('@s.whatsapp.net', '')}` : `@${participant.replace('@s.whatsapp.net', '')}`
    switch (convo) {
        case 'windi are you awake': return await greetings(sock, msgupsert.messages[0].key.remoteJid, mention, participant);
        case 'windi cek cctv': return await cctvData(sock, msgupsert.messages[0].key.remoteJid, mention, participant);
        case 'windi cek page': return await pageData(sock, msgupsert.messages[0].key.remoteJid, mention, participant);
        case 'windi cek server': return await severData(sock, msgupsert.messages[0].key.remoteJid, mention, participant);
        case 'windi cek service': return await serviceData(sock, msgupsert.messages[0].key.remoteJid, mention, participant);
        default: return 'Command not found';
    }
}

/**
 * For Whatsapp Chat
 */


// /**
//  * 
//  * @param {*} sock 
//  * @param {*} id 
//  * @param {*} mention 
//  * @param {*} participant 
//  */
// const replyMsg = async(sock, id, mention, participant) => {
//     await sock.sendMessage(id,{text: `Helo ${mention} please wait`, mentions: [participant]});
// }

/**
 * 
 * @param {*} sock 
 * @param {*} id 
 * @param {*} mention 
 * @param {*} participant 
 */
const greetings = async(sock, id, mention, participant) => {
    await sock.sendMessage(id,{text: `Helo ${mention} i'm awake`, mentions: [participant]});
}

/**
 * 
 * @param {*} sock 
 * @param {*} id 
 * @param {*} mention 
 */
const cctvData = async (sock, id, mention, participant) => {
    await utils.cctv(mention).then((value) => {
        sock.sendMessage(id, { text: `${value}`, mentions: [participant] })
    }).catch((e) => {
        sock.sendMessage(id, { text: `${e}` })
    })
}

/**
 * 
 * @param {*} sock 
 * @param {*} id 
 * @param {*} mention 
 */
const pageData = async (sock, id, mention, participant) => {
    await utils.page(mention).then((value) => {
        sock.sendMessage(id, { text: `${value}`, mentions: [participant] })
    }).catch((e) => {
        sock.sendMessage(id, { text: `${e}` });
    })
}

/**
 * 
 * @param {*} sock 
 * @param {*} id 
 * @param {*} mention 
 */
const severData = async (sock, id, mention, participant) => {
    await utils.server(mention).then((value) => {
        sock.sendMessage(id, { text: `${value}`, mentions: [participant] })
    }).catch((e) => {
        sock.sendMessage(id, { text: `${e}` });
    })
}

/**
 * 
 * @param {*} sock 
 * @param {*} id 
 * @param {*} mention 
 */
const serviceData = async (sock, id, mention, participant) => {
    await utils.service(mention).then((value) => {
        sock.sendMessage(id, { text: `${value}`, mention: [participant] })
    }).catch((e) => {
        sock.sendMessage(id, { text: `${e}` });
    });
}


/**
 * For API
 */


/**
 * @param {String} id
 * @param {String} message
 */
exports.sendmsg = async (id, message) => {
    let socket = await this.connectionToWhatsapp();
    setTimeout(async () => {
        await socket.presenceSubscribe(id);
        await delay(500)

        await socket.sendPresenceUpdate('composing', id);
        await delay(500)

        await socket.sendPresenceUpdate('paused', id);
        await socket.sendMessage(id, { text: message });
    }, 1000);
}



// Exports
module.exports = { connectionToWhatsapp }
