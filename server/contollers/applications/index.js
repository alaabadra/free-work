const addHireMember = require('./addHiredMember');
const updateHireMember = require('./patchHiredMember');
const addApplication = require('./addApplication');
const getOfferApplications = require('./getOfferApplications');
const getMyApplication = require('./getMyApplication');

module.exports = {
  addHireMember, updateHireMember, addApplication, getOfferApplications, getMyApplication,
};