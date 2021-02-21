const nodemailer = require('nodemailer');

exports.mailDBController = {
    sendMail(req, res) {
        console.log(req);
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
            subject: 'New plant request',
            text: 
            `Hey dude!                                                                                            
             I didnt found the plant ${req.body.plantName},
             there is any chance that you can add this plant for me?
             Thanks!`
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
