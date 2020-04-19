const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = ( req, res ) =>{
    let { items, total } = req.body

    try{
    const msg = {
        to: order.email,
        from: 'emily@shopevansgray.com',
        templateId: 'd-9229a28e33e948f7a4eb8b1833557825',
        dynamic_template_data: {
            items: items,
            total: total
        }
    };

    const mail = sgMail.send(msg);
        res.send(mail);
    } catch (e){
        res.send(e);
    }
};