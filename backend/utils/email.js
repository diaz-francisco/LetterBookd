const nodemailer = require("nodemailer");

const sendEmail = async options => {
  ///Transporter
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  });
  //Define email options
  const mailOptions = {
    from: `BookClub <${process.env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
