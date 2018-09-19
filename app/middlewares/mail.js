// Fix for TLS error
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports.sendMail = function(mail, app){

    let nodemailer = require('nodemailer');

    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account');
            console.error(err);
            return process.exit(1);
        }
    
        console.log('Credentials obtained, sending message...');
 
        let conn;

        app.config.dbConnection()

        .then(function(connection){

            let AuthDAO = new app.app.models.AuthDAO(connection);
            conn = connection;

            return AuthDAO.getUser(mail.idUsuario, null)

        })

        .then(function(query){

            console.log(JSON.stringify(query,null,4))
        })

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: 't.macahyba@gmail.com, baz@example.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world!!!', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });
}

