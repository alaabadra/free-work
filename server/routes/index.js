const router = require('express').Router();

const {
  authentication,
  applications,
  filter,
  member,
  offer,
  offerType,
  skills,
  erros,
} = require('../contollers');

router.get('/', (req, res) => {
    res.send('Server is running on 4000!!');
  });
     
  
router.post('/login', authentication.login);
router.get('/logout', authentication.logout);

/* Application */
router.get('/offer-applications/:offerId', applications.getOfferApplication);////for page offerdetails for owner(all apps for his offers)

// router.get('/:memberId/my-applications', application.getMyApplications);
router.get('/:memberId/my-applications/:offerId', application.getMyApplication);


router.post('/applications', applications.addApplication);

router.post('/hired_member', applications.addHireMember);
router.patch('/hired_member/:memberId', applications.updateHireMember);

/* filter */
router.route('/filter/:member_id')
  .get(filter.getFilter)
  .patch(filter.updateFilter);

/* Member */
router.get('/members/:offset', member.getMembers);
router.post('/members', member.addMember);

/* Offer */
router.get('/offers/:offset', offer.getOffers);
router.get('/offer/:offerId', offer.getOfferDetails);//////for offerDetails to show offer in this page (owner , user)
router.post('/offers', offer.addOffer);
router.delete('/offers/:offerId', offer.deleteOffer);

router.get('/my-offers/:memberId', offer.getMyOffers);

router.post('/saved-offers', offer.addSavedOffer);
router.get('/saved-offers/:memberId', offer.getSavedOffers);
router.delete('/saved-offers/:memberId', offer.deleteSavedOffer);

/* Offer Type */
router.get('/offer-type', offerType.getOfferTypes);
router.post('/offer-type', offerType.addOfferType);


/* Skills */
router.get('/skills', skills.getSkills);
router.get('/skills/:memberId', skills.getMemberSkills);
router.post('/skills', skills.addSkills);

router.use(erros.notFound);
router.use(erros.serverError);

module.exports = router;



