//when go into page offerdetails (when click on card to show dtails on this offer)
const {getOfferDetails} = require('../../database/queries/offers/getOfferDetails')
module.exports = (req, res) => {
  getOfferDetails(req.params.offerId)
  .then((result) => {
    res.send({
      error:null,
      data:result.rows
    })  
  }).catch((err) => {
    next({code : 500 , msg:'internal server error'})
  });
    // res.send(' get offer details ');
  };