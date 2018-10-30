// Fix for TLS error
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

module.exports.sendMail = function(app, mail, mode){

    let nodemailer = require('nodemailer');
    let Promise = require("bluebird");
    let subject, text, html, attachments;

    switch (mode){

        case 'insert':

            subject = 'Novo orçamento em Portal Orçamento ✔';
            text = 'Aviso. Novo orcamento em ';
            html = '<b>Aviso.<br>Novo orcamento em <a href=';
            attachments = null
            break;
        case 'approve':
            
            subject = 'Orcamento aprovado em Portal Orçamento ✔'
            text = 'Aviso. Orcamento aprovado em '
            html = '<b>Aviso.<br>Orcamento aprovado <a href=';
            attachments = [ { path: './app/public/pdf/'+ mail.id + '.pdf' }];
            break;
        default:
            console.log("Erro ao enviar email")
            return false;
    }
 
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAILUSER, // generated ethereal user
            pass: process.env.MAILPASS // generated ethereal password
        }
    });

    let connection = app.config.dbConnection();

    connection.connect()

    .then(()=>{

        let AuthDAO = new app.models.AuthDAO(connection);

        let getUser = AuthDAO.getUserById(mail.idusuario);
        let getManagers = AuthDAO.getManagerList();

        return Promise.props({
                                'user': getUser,
                                'managers': getManagers
        })

    })

    .then(query=>{

        let access;
        let to = '';
        for (let i=0; i < query.managers.rowCount; i++) {

            to += query.managers.rows[i].email + ', ';
        }
        
        process.env.SERVERIP ? access = 'http://' + process.env.SERVERIP + ':3000' : access = 'https://portalorcamento.herokuapp.com'

        let url = access + '/detalhe/orcDetalhe/'+ mail.id;
        let mailOptions = {
            from: '"Admin 👻" <' + process.env.MAILUSER + '> ', // sender address
            to: to + query.user.rows[0].email + ' ,' + process.env.MAILUSER, // list of receivers
            subject: subject, // Subject line
            text: text + url, // plain text body
            html: html + url +'>' + url + '</a></b>', // html body
            attachments : attachments
        };

        if (process.env.SENDMAIL == 1) {

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
                
            });

        } else {

            console.log(JSON.stringify(mailOptions,null,4))
        }
    })

    .then(()=>{

        if (connection) { connection.end(); }
    })

}

