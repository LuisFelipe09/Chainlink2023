import request from 'request';
import * as fs from 'fs'
import 'dotenv/config'
const JWT = `Bearer ${process.env.PINATA_JWT}`

export const pinFileToIPFS = async (dataImage) => {
    var options = {
        'method': 'POST',
        'url': 'https://api.pinata.cloud/pinning/pinFileToIPFS',
        'headers': {
            'Authorization': JWT
        },
        formData: {
            'file': {
                'value': dataImage,
                'options': {
                    'filename': 'image.jpg',
                    'contentType': null
                }
            }
        }
    };

    let response = await doRequest(options);

    return JSON.parse(response).IpfsHash

}

function doRequest(url) {
    return new Promise(function (resolve, reject) {
      request(url, function (error, res, body) {
        if (!error && res.statusCode === 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });
  }
