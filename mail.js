import nodemailer from "nodemailer"

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    
    user:process.env.NODEMAILER_USER,
    pass:process.env.NODEMAILER_PASS,
  }
});

var mailOptions = {
  from: 'sparrowkarthik007@gmail.com',
  to: 'sparrowkarthik007@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'hi',
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});