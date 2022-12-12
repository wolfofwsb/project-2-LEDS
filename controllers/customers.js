const Cust= require('../models/customers');
const User = require('../models/user');
const Appt = require('../models/appointment')


module.exports = {
  
  new: newCust,
  create,
  index,
  show,
  edit,
  update,
  delete: deleteCust
}





function newCust(req, res) {

  res.render('customers/new', { user: req.user })
}

function create(req, res) {
  // console.log(req.body, ' contents of the form');
  // update

  console.log(req.body, "after");

  // // remove the white space in the string
  // req.body.cast = req.body.cast.replace(/\s*, \s*/g, ',')
  // req.body.cast = req.body.cast.split(',')

  // The server now tells the Model
  // to take the contents of the form (req.body) sent from the customer
  // and put it in the database
  req.body.user = req.user

  Cust.create(req.body, function (err, customerDoc) {

    console.log(req.body)
    if (err) {
      console.log("======================err");
      console.log(err);
      console.log("==========================================");

      return res.send("err creating check the terminal");
    }
    console.log("=============== ");
    console.log(customerDoc)
    console.log("==========================================");


    // respond to the customer
    res.redirect('/customers');
  })
}; 

async function index(req, res) {
  const customerDocs = await Cust.find({});
  res.render('customers', { customer: customerDocs, user: req.user })
}

async function show(req, res) {
  try {
    const customerDoc = await Cust.findById(req.params.id);
    console.log(customerDoc);
    res.render('customers/show', { customer: customerDoc });

  } catch (err) {
    console.log(err)
    res.send('err2')
  }
}

function edit(req, res) {
  console.log(req.user._id, '======================== here is req.user._id')
  Cust.findOne({_id: req.params.id, user: req.user._id}, function(err, customerDoc) {
    if (err || !customerDoc) return res.redirect('/customers');
    res.render('customers/edit', {customer: customerDoc});
  });
}

function update(req, res) {
  console.log(req.params.id, '----------------- params')
  Cust.findOneAndUpdate(
    {_id: req.params.id},
    // update object with updated properties
    req.body,
    // options object with new: true to make sure updated doc is returned
    {new: true},
    function(err, customerDoc) {
      if (err || !customerDoc) return res.redirect('/customer');
      res.redirect('/customers');
    }
  );
}

function deleteCust(req, res) {
  Cust.findOneAndDelete(
    // Ensue that the book was created by the logged in user
    {_id: req.params.id }, function(err) {
      // Deleted book, so must redirect to index
      res.redirect('/customers/');
    }
  );
}