// import the Movie Model in order to perform CRUD
// operations on the database
const Appointment = require("../models/appointment");
const Cust = require("../models/customers");



module.exports = {
  index,
  create,
  delete: deleteAppt
};



function index(req, res) {
  // Tell the model,
  // to go get ALL of the movies from
  // the database Movie is our model
  Appointment.find({}, function (err, appointmentDocs) {
    // moviesDocs is all of the movies
    // from our collection in mongodb!
    console.log(appointmentDocs);

    // respond to the client inside the callback of the model
    res.render("appointments/index", { appointments: appointmentDocs });
  });
}

function create(req, res) {
    // first check the contents of the form
    // console.log('========================');
    // console.log(req.body, " <- content of the form");
    // console.log('=========================')
    // // check for the movie id in the params
    // console.log('========================');
    // console.log(req.params.id, ' <req.params.id aka(the movie id)')
    // console.log('========================');

    // NOW We need to use our model to take the contents of the form (req.body)
    // and put them in the database

    // One Movie to many reviews
    // adding a review to A movie

    // 1. Find the movie we want to add the review!
    // req.params.id is the movie id
    Cust.findById(req.params.id, function (err, customerDoc) {
        if (err) {
            console.log(err, " <- err from Movie.findById callback");
            return res.send("error from create reviews check the terminal");
        }

        console.log("========================");
        // found movie from the database that we want to add the review (req.body) to!
        console.log(customerDoc, " <- client from the database!");
        console.log("========================");
        //   req.body.user = req.user._id
        //   req.body.userName = req.user.userName
        //   req.body.userAvatar = req.user.avatar
        // 2. add the review to the movieDocuments reviews array
        // req.body (contents of the form), which in this case represents a review!
        customerDoc.appointments.push(req.body);
        // since movieDoc is a document and we're mutating it (changing it, adding something to reviews array)
        // we need to tell the database, so to tell database we call `.save() on the movieDoc
        customerDoc.save(function (err, customerDoc){ 
            // respond to the clinet
            //   console.log(movieDoc)
            console.log(err, " <_ err from movieDoc.save callback")
            // respond to the client in the callback
            // go back to the show page that the form was submitted from
            // so you can check the movie from the database in the show controller
            res.redirect(`/customers/${req.params.id}`);
        });
        
    });
};

function deleteAppt(req, res) {
    console.log(req.params.id, '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    Cust.findOne({ 'appointments._id': req.params.id }, function (err, customerDoc) {
       
      if (!customerDoc) return res.redirect('/customers/show');
  
      customerDoc.appointments.remove(req.params.id);
      
      customerDoc.save(function (err) {
        if (err) return res.send('err, check terminal');
        res.redirect(`/customers/${customerDoc._id}`)
      })
    })
  }