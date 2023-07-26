require("dotenv").config();
const nodemilar = require("nodemailer")
const { NODEMAILER, NODEMAILER_MAIL } = process.env

const config = {
  service: 'Gmail',
  auth: {
    user: NODEMAILER_MAIL,
    pass: NODEMAILER,
  },
};

async function avisoLogin(email) {
  const transport = nodemilar.createTransport(config);

  const mensaje = {
    from: `Tu E-commerce de Libros <${NODEMAILER_MAIL}>`,
    to: email,
    subject: '¡Bienvenido a nuestro E-commerce de Libros!',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h1 style="color: #1e3799;">¡Bienvenido a nuestro E-commerce de Libros!</h1>
        <p style="font-size: 16px;">Gracias por crear una cuenta en nuestro sitio.</p>
        <p style="font-size: 16px;">Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
        <p style="font-size: 16px;">Esperamos que encuentres los libros que estás buscando.</p>
        <p style="font-size: 16px;">¡Disfruta de una gran experiencia de lectura con nosotros!</p>
        <p style="font-size: 16px;">Atentamente,</p>
        <p style="font-size: 16px;">El equipo de Tu E-commerce de Libros</p>
      </div>
    `,
  };

  try {
    const info = await transport.sendMail(mensaje);
    console.log('Correo enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}


async function avisoDeCompra(email, detallesCompra) {
  const transport = nodemilar.createTransport(config);

  const mensaje = {
    from: `Tu E-commerce de Libros <${NODEMAILER_MAIL}>`,
    to: email,
    subject: 'Confirmación de compra',
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h1 style="color: #1e3799;">¡Gracias por tu compra, ${detallesCompra?.nombreUsuario}!</h1>
        <p style="font-size: 16px;">Hemos recibido tu orden de compra en nuestro E-commerce de Libros.</p>
        <h2 style="color: #1e3799;">Detalles de la compra:</h2>
        <ul style="font-size: 16px; text-align: left;">
          ${detallesCompra?.map((libro) => `<li>${libro?.titulo} - ${libro?.precio} USD</li>`).join('')}
        </ul>
        <p style="font-size: 16px;">Total pagado: ${detallesCompra.priceTotal} USD</p>
        <p style="font-size: 16px;">Esperamos que disfrutes de tus nuevos libros.</p>
        <p style="font-size: 16px;">¡Gracias por elegirnos!</p>
        <p style="font-size: 16px;">Atentamente,</p>
        <p style="font-size: 16px;">El equipo de Tu E-commerce de Libros</p>
      </div>
    `,
  };

  try {
    const info = await transport.sendMail(mensaje);
    console.log('Correo de notificación de compra enviado:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error al enviar el correo de notificación de compra:', error);
  }
}


module.exports ={ 
  avisoLogin,
  avisoDeCompra
};