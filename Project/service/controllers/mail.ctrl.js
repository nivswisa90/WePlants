const { text } = require('express');
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

        const suggestionMail = {
            from: process.env.GMAIL_USER,
            to: req.body.email,
            subject: 'New plant request',
            text: `Hey dude!                                                                                            
             I didn't found the plant ${req.body.plantName},
             there is any chance that you can add this plant for me?
             Thanks!`
        };

        // const wateringMail = {
        //     from: process.env.GMAIL_USER,
        //     to: req.body.email,
        //     subject: 'Water advice',
        //     text: `Hey dude! 
        //     Time to watering plants! The plant ${req.body.plantName} is thirsty, here is our recommendation for watering ${req.body.plantName}:
        //     ${req.body.wayOfCare.water}.
        //     Have a good day, ${req.body.firstName}!`
        // }

        const mailOptions = (option) => {
            transporter.sendMail(option, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        switch (req.body.type) {
            case 'suggestion':
                mailOptions(suggestionMail);
                break;
            default:
                break;
        }

        res.json('Email sent successfully');
    }

}
