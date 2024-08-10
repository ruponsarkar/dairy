
const request = require("request");
const { application } = require("express");
const axios = require('axios');
const crypto = require('crypto');

const CASHFREE_APP_ID = '5259a54b96fe44e706ae1bd59525';
const CASHFREE_SECRET_KEY = 'cfsk_ma_test_b4ed889073278ce8c466899073cf9056_1ffb4f2c';

module.exports = {
    async createBeneficiary(req, res) {
      const { beneficiaryId, name, email, phone, bankAccountNumber, ifscCode, bankName } = req.body;
      const beneficiaryData = {
        bene_id: beneficiaryId,
        bene_name: 'Mithu Zaman',
        bene_email: email,
        bene_phone: phone,
        bene_acc_num: bankAccountNumber,
        bene_ifsc: ifscCode,
        bene_bank_name: bankName
      };
    
      const dataString = JSON.stringify(beneficiaryData);
      const checksum = generateChecksum(dataString, CASHFREE_SECRET_KEY);
    
      try {
        const response = await axios.post('https://api.cashfree.com/api/v2/beneficiary/add', beneficiaryData, {
          headers: {
            'x-api-key': CASHFREE_APP_ID,
            'x-signature': checksum,
            'Content-Type': 'application/json'
          }
        });
    
        // res.json(response.data);
        res.status(200).send(response.data);
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
