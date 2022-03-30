const Offer = require('../models/Offer')
module.exports = {
    async addOffer(request, response) {
        const { name, initDate, expireDate } = request.body;

        const hasOffer = await Offer.find()

        if(hasOffer.length > 0) {
            const offer = await Offer.updateMany({ name, initDate, expireDate });
            return response.json({ error: false, offer });
        }else{
            const offer = await Offer.create({ name, initDate, expireDate });
            return response.json({ error: false, offer });
        }
    },
    async getOffer(request, response) {
        const offer = await Offer.find();
        return response.json({ error: false, offer });
    },

    async deleteOffer(request, response) {
        const { id } = request.body;
        const offer = await Offer.deleteOne({ _id: id });
        return response.json({ error: false, offer });
    }
}