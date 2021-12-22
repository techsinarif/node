const router = require('express').Router();
const contact = require('../models/contact');

router.post('/add', async (req, res) => {
  const {name, emailId, phoneNumber} = req.body;
  try {
    const createContact = await contact.create({name, emailId, phoneNumber});
    console.log('contact has been saved ', createContact);
  } catch (err) {
    console.log(err);
    return res.status(400).json({status: 'FAILURE', error: err})
  }
  return res.status(200).json({status: 'SUCCESS', msg: 'Contact details has been saved'});
});

router.get('/all', async (req, res) =>{
  let allContacts;
  try {
    allContacts = await contact.find();
  } catch(err) {
    console.log(err);
    return res.status(400).json({status: 'FAILURE', error: err});
  }
  return res.status(200).json({status: 'SUCCESS', contacts: allContacts});
});

router.put('/update/:id', async (req, res) => {
  const {id: _id} = req.params;
  const {name, emailId, phoneNumber} = req.body;
  try {
    const updateData = await contact.updateOne({_id: _id},{name, emailId, phoneNumber});
  } catch (err) {
    console.log(err);
    return res.status(400).json({status: 'FAILURE', error: err});
  }
  return res.status(200).json({status: 'SUCCESS', msg: 'data has been updated'});
});

router.delete('/delete/:id', async (req, res) => {
  const {id: _id} = req.params;
  try{
    const deleteContact = await contact.deleteOne({_id: _id});
  } catch (err) {
    console.log(err);
    return res.status(400).json({status: 'FAILURE', error: err});
  }
  return res.status(200).json({status: 'SUCCESS', msg: 'contact has been deleted'});
});

module.exports = router;