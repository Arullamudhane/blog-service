const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendEmail(email, subject, body, llh) {
  const mailOptions = {
    from: "your buddy <testmailforyoudood3@gmail.com>", // Sender address
    to: email, // List of receivers
    subject, // Subject line
    text: body, // Plain text body
    // You can also use 'html' to send HTML emails
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error occurred:", error);
    }
  });
}

module.exports = { sendEmail };
