const nodemailer = require("nodemailer");

const emaiLAddress = process.env.EMAIL_ADDRESS;
const password = process.env.PASSWORD;

const sendEmail = async (req, res) => {
    const {
        emailAddressFromUser,
        subject,
        email
    } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: emaiLAddress,
              pass: password
            }
          });
          
          const mailOptions = {
            from: emailAddressFromUser,
            to: emaiLAddress,
            subject: subject || "Email from user from Notesage user",
            text: email
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    } catch (error) {
        console.log(error)
    }
}

module.exports = sendEmail; 