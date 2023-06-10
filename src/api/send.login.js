import axios from "axios";

export const getLoginRequest = async (/** @type {any} */ email, /** @type {any} */ passrowd) =>
  await axios.post("http://localhost:4000/api/login",{email: email,pass: passrowd});

  export const getRegisterRequest = async (/** @type {any} */ phone, /** @type {any} */ email, /** @type {any} */ name, /** @type {any} */ last, /** @type {any} */ pass) =>
  await axios.post("http://localhost:4000/api/register",{phone: phone,email: email,pass: pass,name: name,last: last}, {headers: {'Access-Control-Allow-Origin': '*','content-type': 'application/json'}});

  export const getRecuperar = async (/** @type {any} */ email) =>
  await axios.post("http://localhost:4000/api/recuperar",{email: email});