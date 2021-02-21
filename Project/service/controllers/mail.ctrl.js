const nodemailer = require('nodemailer');

exports.mailDBController = {
    sendMail(req, res) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        });
    
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: 'nivswisa9@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
    
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.json('test');
    }
    
}
