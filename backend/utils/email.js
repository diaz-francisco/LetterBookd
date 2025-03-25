const nodemailer = require("nodemailer");

const sendEmail = options => {
  ///Transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //Define email options

  //Send email
};
