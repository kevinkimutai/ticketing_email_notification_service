const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
require("dotenv").config();

async function sendEmail(to, subject, template, context, attachments) {
  // Create a transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  // Point to the template folder
  const handlebarOptions = {
    viewEngine: {
      extName: ".hbs",
      partialsDir: path.resolve(__dirname, "../templates/partials"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../templates/emails"),
    extName: ".hbs",
  };

  // Attach the handlebars plugin to the nodemailer transporter
  transporter.use("compile", hbs(handlebarOptions));

  // Setup email data
  let mailOptions = {
    from: "notification@b2msdk.online",
    to: to, // List of receivers
    subject: subject, // Subject line
    template: template, // The name of the template file
    context: context, // The context to be passed to the template
    attachments: attachments ? attachments : [], // Add attachments if present
  };

  // Send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = sendEmail;
