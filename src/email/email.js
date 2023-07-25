require("dotenv").config();
const nodemilar = require("nodemailer")
const { NODEMAILER, NODEMAILER_MAIL } = process.env

const config = {
service: "Gmail",
auth: {
    user: NODEMAILER_MAIL,
    pass:  NODEMAILER  
   }
}

async function enviado (email) {
    const transport = nodemilar.createTransport(config)
    const mensaje = {
        from: NODEMAILER_MAIL,
        to: email,//"email el que lo quiero enviar",
        subject: "correo de prueba",
        text: "envio desde back end."
    }
    
    try {
    const info = await transport.sendMail(mensaje)
    console.log(info)
    console.log('Correo enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

module.exports = enviado;