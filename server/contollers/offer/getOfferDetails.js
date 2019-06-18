//when go into page offerdetails (when click on card to show dtails on this offer)
const { getOffer } = require('./../../database/queries/offers/getOfferId');

module.exports = (req, res, next) => {
  console.log('getOfferDetaiils')
  const { offerId } = req.params;
  getOffer(offerId)
    .then(({ rows }) => res.status(200).send({ error: null, data: rows }))
    .catch(err => next(err));
};
