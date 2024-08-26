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
    const id = msgupsert.messages[0].key.remoteJid;
    const mention = `@${id.replace('@s.whatsapp.net', '')}`

    switch (convo) {
        case 'windi cek cctv': return await cctvData(sock, id, mention);
        case 'windi cek page': return await pageData(sock, id, mention);
        case 'windi cek server': return await severData(sock, id, mention);
        case 'windi cek service': return await serviceData(sock, id, mention);
        default: return 'Command not found';
    }
}

/**
 * For Whatsapp Chat
 */

/**
 * 
 * @param {*} sock 
 * @param {*} id 
 * @param {*} mention 
 */
const cctvData = async (sock, id, mention) => {
    await utils.cctv(mention).then((value) => {
        sock.sendMessage(id, { text: `${value}`, mentions: [id] })
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
const pageData = async (sock, id, mention) => {
    await utils.page(mention).then((value) => {
        sock.sendMessage(id, { text: `${value}`, mentions: [id] })
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
const severData = async (sock, id, mention) => {
    await utils.server(mention).then((value) => {
        sock.sendMessage(id, { text: `${value}`, mentions: [id] })
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
const serviceData = async (sock, id, mention) => {
    await utils.service(mention).then((value) => {
        sock.sendMessage(id, { text: `${value}`, mention: [id] })
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
