import axios from 'axios';

const url = 'https://waba-sandbox.360dialog.io/v1/messages'

export const sendMessage = async (text, phone_number) => {
  const payload = buildMessage(text, phone_number);
  const {data} = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'D360-API-KEY' : get_D360_API_KEY(phone_number)
      }
    });

    return true;
}

const buildMessage = (text, phone_number) => {
  return {
    "recipient_type": "individual",
    "to": phone_number,
    "type": "text",
    "text": {
        "body": text
    }
  }
}

// Get api key for send request a 360Dialog provider whatsapp
const get_D360_API_KEY = (phone_number) => {
  return '2TIO7c_sandbox';
}