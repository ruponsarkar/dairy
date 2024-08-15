
const request = require("request");
const { application } = require("express");
const axios = require('axios');
const crypto = require('crypto');

module.exports = {
  async createBeneficiary(req, res) {
    let beneficiaryData = req.body.data;
    try {
      const options = {
        method: 'POST',
        url: 'https://sandbox.cashfree.com/payout/beneficiary',
        headers: {
          accept: 'application/json',
          'x-api-version': '2024-01-01',
          'x-request-id': '4dfb6680-46fe-11ee-be56-0242ac120002',
          'content-type': 'application/json',
          'x-client-id': process.env.CASHFREE_APP_ID,
          'x-client-secret': process.env.CASHFREE_SECRET_KEY
        },
        data: beneficiaryData
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          res.status(200).send(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
      
    } catch (error) {
      console.error('Error creating beneficiary:', error);
      res.status(500).send('Error creating beneficiary');
    }
  },
};

function generateChecksum(data, secretKey) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(data);
  return hmac.digest('hex');
}
