import { Configuration, OpenAIApi } from "openai";
import { pinFileToIPFS } from './pinata.mjs'
import  axios  from  'axios'
import  * as fs from 'fs'
import 'dotenv/config'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


export const getCreateImage = async (req, res) => {
    let prompt = req.query.prompt;

   
    const url = await createImage(prompt);
    
    const dataImage = await downloadImage(url, 'image.jpg');
    let cid = await pinFileToIPFS(dataImage)
    let urlFinal = `https://moccasin-thorough-mongoose-461.mypinata.cloud/ipfs/${cid}?pinataGatewayToken=0LKYubnREgLRes--0GDEGyyIX28XP83UaFDyH8W0IdsVw-jFPPIQhFzwoSLalRyw&_gl=1*4252sl*rs_ga*MTgyNjk5ODA3MC4xNjg2NTEwNTE0*rs_ga_5RMPXG14TE*MTY4NjUyMTkzNi4zLjEuMTY4NjUyMzcyMy41OC4wLjA.`
    return res.status(200).json({ url: urlFinal });
}

export const createImage = async (prompt) => {
    const response = await openai.createImage({
        prompt,
        n: 1,
        size: "512x512"
    });

    return response.data.data[0].url;
}

const downloadImage = async (url, filename) => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return response.data;
}


