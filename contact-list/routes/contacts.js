// We are using express router, which helps us to manage the api routing files in more structured way.

const router = require('express').Router();
const contacts = require('../models/contacts');

router.post('/add', async (req, res) => {
  const {name, emailId, phoneNumber} = req.body;
  try{
    const createContact = await contacts.create({name, emailId, phoneNumber});
    console.log('Contacts created successfully', createContact);
  } catch(err) {
    console.log(err);
    return res.status(400).json({status: 'FAILURE', error: err});
  }
  return res.status(200).json({status: 'SUCCESS', msg: 'Contact has been added'});
});

// Get all the contacts from the db
router.get('/all', async (req, res) => {
  let allContacts;
  try {
    allContacts = await contacts.find();
  } catch(err) {
    console.log(err);
    return res.status(400).json({status: 'FAILURE', error: err});
  }
  return res.status(200).json({status: 'SUCCESS', contacts: allContacts});
});

// Update the contact
router.put('/update/:id', async (req, res) => {
  const {id: _id} = req.params; // Assigning id to _id which is a es6 feature. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
  const {name, emailId, phoneNumber} = req.body;
  try {
    const updateData = await contacts.updateOne({_id: _id}, {name, emailId, phoneNumber});
  } catch(err) {
    console.log(err);
    return res.status(400).json({status: 'FAILURE', error: err});
  }
  return res.status(200).json({status: 'SUCCESS', msg: 'Contact details has been updated'});
});

router.delete('/delete/:id', async (req, res) => {
  const {id: _id} = req.params;
  try {
    const deleteContact = await contacts.deleteOne({_id: _id});
  } catch (err) {
    console.log(err);
    return res.status(400).json({status: 'FAILURE', error: err});
  }
  return res.status(200).json({status: 'SUCCESS', msg: 'Contact has been deleted'});
});

module.exports = router;
