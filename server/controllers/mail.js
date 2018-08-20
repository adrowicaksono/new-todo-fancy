var jwt = require('jsonwebtoken');
require('dotenv').config()
const nodemailer = require('nodemailer')

const create = function (req, res) {
    console.log(req.body.peoples)
    console.log(req.body.documentId)
    console.log(req.headers.token)
    let content = 'test dulu mailer ya'
    let receiver = 'chuddywarrior@gmail.com'

    let transporter = nodemailer.createTransport({
        // service : 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user : 'todofancyme@gmail.com',
            pass : 'abcd1234?'
        }
    })

    let mailOptions = {
        from: '"adrowicaksono" todofancyme@gmail.com',
        to : receiver,
        subject : "hello",
        text: content,
        html:`<b> Hello world <b>
        
             <p> ${content} </p>`
    }

    transporter.sendMail(mailOptions, (err, info)=>{
        if(err){
            return console.log(err)
        }
        
        console.log('Message sent: %s', info.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
        res.status(200).json({msg:"success mail"})
    })

}

module.exports = {
    create,
}