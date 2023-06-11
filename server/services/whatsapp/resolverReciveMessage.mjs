import axios from 'axios';
import { sendMessage } from './sendTextMessage.mjs'
import {sendMessageNFT} from '../account.mjs'



const text_message = async (message, phone_number) => {
    const response = await send_message_bot(phone_number, message);
    await sendMessage(response, phone_number);
}


const type_messages = {
    "text": text_message
}

export const postReviceMessage = async (req, res) => {
    const message = req.body.messages[0];
    const { from, type } = message;
    const type_message = type;
    const fn_type_message = type_messages[type_message] || noImplementFunction;
    await fn_type_message(message[type_message].body, from);

    return res.status(200)
}


const noImplementFunction = async () => {
    // responder mensaje
}


const URL_BOT = 'http://170.187.206.254:5005/webhooks/rest/webhook'
const send_message_bot = async (phone_number, text) => {

    const payload = {
        "sender": phone_number,
        "message": text
    };

    const { data } = await axios.post(URL_BOT, payload, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    let json = {};
    let text_message = "";

    try {
        json = JSON.parse(data[0].text);
        text_message = encodeURIComponent(json.original_message);
        console.log(json);
        let ulr = `https://c35e-186-155-166-127.ngrok.io/api/image?prompt=${text_message}`;
        return 'ok'
        sendMessageNFT(phone_number, ulr)
    }catch{
        text_message = data[0].text;
    }

    return text_message;
}