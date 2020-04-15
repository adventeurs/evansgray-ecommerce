module.exports = ( req, res ) =>{
    let order = req.body

    try{
    const msg = {
        to: order.email,
        from: 'emily@shopevansgray.com',
        templateId: 'd-d2bd9dc51a2c4b3db25f99d9f5d4daf8',
        dynamic_template_data: {
            items: order.items,
            total: order.total
        }
    };

    const mail = sgMail.send(msg);
        res.send(mail);
    } catch (e){
        res.send(e);
    }
};