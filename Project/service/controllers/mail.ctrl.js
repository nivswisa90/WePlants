const nodemailer = require('nodemailer');

exports.mailDBController = {
    // function to send create transport mail and authenticate
    sendMail(req, res) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        // mail from user to admin to suggest a plant
        const suggestionMail = {
            from: process.env.GMAIL_USER,
            to: req.body.email,
            subject: 'New plant request',
            text: `Hey dude!                                                                                            
             I didn't found the plant ${req.body.plantName},
             there is any chance that you can add this plant for me?
             Thanks!`
        };

        // notification from system to user, watering plant
        const wateringMail = {
            from: process.env.GMAIL_USER,
            to: req.body.email,
            subject: 'Water advice',
            text:
                `Hey ${req.body.firstName}! 
            Time to watering plants! The plant ${req.body.plantName} is thirsty, here is our recommendation for watering ${req.body.plantName}:
            ${req.body.water}!`
        }

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
            case 'notification':
                mailOptions(wateringMail);
            default:
                break;
        }

        res.json('Email sent successfully');
    }
}
