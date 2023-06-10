import { pool } from "../DB.mjs";
import mysql from 'mysql'
import { sha256, sha224 } from 'js-sha256';
import nodemailer from "nodemailer";

export const getLogin = async (req, res) => {
  try {
    const con = mysql.createConnection(pool);
    if(req.body.email != null && req.body.pass != null){
      con.query("select `id`, `name`, `lastname`, `email`, `phone`, `rol`, `state` from users where email = ? and password = ? and state = 1", [req.body.email, req.body.pass], function (err, result, fields) {
        if (err) throw err;
        if (result.length === 1){
            console.log(result);
            res.send({message: "Good!", data: result });
            con.destroy();
        }else{
          con.destroy();
          return res.status(200).json({message:"Add information in all inputs!"});
        }
      })
    }else{
      return res.status(200).json({message:"Add information in all inputs!"});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRegister = async (req, res, next) => {
  try {
    const con = mysql.createConnection(pool);
    if(req.body.phone != null && req.body.email != null && req.body.pass != null && req.body.name != null && req.body.last != null){
      con.query("select * from users where email = ? and state = 1", [req.body.email], function (err, result, fields) {
        if (err) throw err;
        if (result.length !== 0){
            console.log(result);
            res.send({message: "Existing mail!" });
            con.destroy();
        }else{
          con.query("select * from users where phone = ? and state = 1", [req.body.phone], function (err, result, fields) {
            if (err) throw err;
            if (result.length !== 0){
                console.log(result);
                res.send({message:"Existing phone!"});
                con.destroy();
            }else{
              con.query("INSERT INTO `users`(`id`, `name`, `lastname`, `email`, `phone`, `password`, `rol`, `state`) VALUES (default, ?, ?, ?, ?, ?, 2, 1)",[req.body.name, req.body.last, req.body.email, req.body.phone, req.body.pass], function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                res.send({message:"Good!"});
                con.destroy();
              });
            }
          });
        }
      });

    }else{
      return res.status(200).json({message:"Add information in all inputs!"});
    }
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }

}

export const getRecuperar = async (req, res, next) => {
  try {
    const transporter = nodemailer.createTransport({
      port: 465,              
      host: "smtp.hostinger.com",
         auth: {
              user: 'bot@fullstacks-lj.com',
              pass: 'Capita25471240.Jose',
           },
      secure: true,
    });
    const con = mysql.createConnection(pool);
    if(req.body.email != null){
      con.query("select `id`, `name`, `lastname`, `email`, `phone`, `rol`, `state` from users where email = ? and state = 1", [req.body.email], function (err, result, fields) {
        if (err) throw err;
        if (result.length === 1){
          let value = randomNumberInRange(999, 10000);
          con.query("UPDATE `users` SET `password`= ? WHERE `email` = ? and `state` = 1", [passwordEncript(value+"$Hackatons"), req.body.email], async function (err, result, fields) {
            if (err) throw err;
              con.destroy();
              let info = await transporter.sendMail({
                from: '"Bot Fullstacks-lj" <bot@fullstacks-lj.com>', // sender address
                to: req.body.email, // list of receivers
                subject: "New Password", // Subject line
                text: "Recovery password?", // plain text body
                html: '<html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Título del documento HTML</title></head><body style="width: 703px;height: 430px;margin-left: auto;margin-right: auto;"><table style="width: 700px;"><tbody><tr><td style=""><h4 style="text-align: center;font-size: larger;margin: 5px;color: #000000;">Hackatons</h4><div style="width: 189px;height: 3px;background: #8CB65F;margin-left: auto;margin-right: auto;"></div></td></tr><tr><td style="padding: 10px;"><p style="text-align: center;font-size: 12px;margin: 0;">Hi, your new password is: '+value+"$Hackatons"+'</p></td></tr></tbody></table></body></html>',
              });
              return res.status(200).json({message:"Good!", info: info});
          })
        }else{
          con.destroy();
          return res.status(200).json({message:"Add information in all inputs!"});
        }
      })
    }else{
      return res.status(200).json({message:"Add information in all inputs!"});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

function passwordEncript(_password) {
  var hash = sha256.hmac.create("0ea5f6acb5d25184ad59b436f73fd5538424cef2cd80fc7d3e6dfe1087c9d228");
  hash.update(_password);
  return hash.hex();
}

function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}