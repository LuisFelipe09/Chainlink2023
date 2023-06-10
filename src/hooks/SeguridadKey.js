import * as React from "react";
import { sha256, sha224 } from 'js-sha256';


// @ts-ignore
async function passwordEncript(_password) {
    var hash = sha256.hmac.create("0ea5f6acb5d25184ad59b436f73fd5538424cef2cd80fc7d3e6dfe1087c9d228");
    hash.update(_password);
    return hash.hex();
}


export default passwordEncript;