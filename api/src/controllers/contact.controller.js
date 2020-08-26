import nodemailer from 'nodemailer';

import emailTemplate from '../config/email.templates';

function generatePassword(size) {
  let password = '';
  for (let i = 0; i < size; i += 1) {
    password += Math.floor(Math.random() * 16).toString(16);
  }
  return password;
}

export default {
  async recover(req, res) {
    try {
      const transport = nodemailer.createTransport(
        {
          host: 'br614.hostgator.com.br',
          port: 465,
          secure: true,
          auth: {
            user: 'naoresponder@lazuliviagens.com.br',
            pass: 'teste123teste123#'
          },
        },
      );

      const mailOptions = {
        from: 'Lazuli Viagens <naoresponder@lazuliviagens.com.br',
        to: 'lazuliviagens@gmail.com',
        subject: 'Lazuli Viagens - Novo lead',
        html: emailTemplate.contact(req.body),
      };

      await transport.sendMail(mailOptions);

      return res
        .status(200)
        .json({
          success: true,
        });
    } catch (err) {
      console.error(err.message);
      return res
        .status(500)
        .json('Internal Server Error');
    }
  },
};
