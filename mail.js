import nodemailer from "nodemailer"

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sparrowkarthik007@gmail.com',
    pass: 'gess xxge ihrh vrys'
  }
});

var mailOptions = {
  from: 'sparrowkarthik007@gmail.com',
  to: 'sparrowkarthik007@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});