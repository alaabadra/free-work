  
const {getOffers} = require('../../database/queries/getOffers')
module.exports = (req, res, next) => {
    getOffers(req.params.offset)
    .then((result) => {
      res.send({
        error:null,
        data : result.rows
      })
    }).catch((err) => {
      next({code:500 , msg:'internal server error'})
    });
  };