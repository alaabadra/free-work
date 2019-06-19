const { getOfferApplications } = require('../../database/queries/applications/index');
console.log('mmmmmmmmmmmmmmmmmmmmmm');

module.exports = (req, res, next) => {
  const { offerId } = req.params;
  console.log(offerId);
  getOfferApplications(offerId)
  
  
    .then((result) => {
      console.log(result);
      
      res.send({
        error: null,
        data: result.rows,
      });
    })
    .catch(() => next({ code: 500, msg: 'Internal Server Error!' }));
  console.log('get offer');
  
};