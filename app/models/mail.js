// Fix for TLS error
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports.sendMail = function(mail, app){
    //console.log(JSON.stringify(mail,null,4))
    let nodemailer = require('nodemailer');

    nodemailer.createTestAccount((err, account) => {
        if (err) {
            console.error('Failed to create a testing account');
            console.error(err);
            return process.exit(1);
        }
    
        console.log('Credentials obtained, sending message...');
 
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
            }
        });

        let conn;

        app.config.dbConnection()

        .then(function(connection){

            let AuthDAO = new app.models.AuthDAO(connection);
            conn = connection;

            return AuthDAO.getUserById(mail.idUsuario)

        })

        .then(function(query){

            let url = 'http://127.0.0.1:3000/detalhe/orcDetalhe/'+ mail.idOrc;
            let mailOptions = {
                from: '"Admin 👻" <admin@example.com>', // sender address
                to: query[0].email + ', baz@example.com', // list of receivers
                subject: 'Hello '+ query[0].nomeUsuario +'✔', // Subject line
                text: 'Novo orcamento em ' + url, // plain text body
                html: '<b>Novo orcamento em <a href=' + url +'>' + url + '</a></b>' // html body
            };

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
        })

        .finally(function(){

            if (conn) { conn.end(); }
        })
    });
}

