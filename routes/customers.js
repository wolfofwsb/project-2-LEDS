const router = require('express').Router();
const passport = require('passport');
const custCtrl = require('../controllers/customers')
const isLoggedIn = require('../config/auth');



router.get('/new', isLoggedIn, custCtrl.new)
router.post('/', custCtrl.create)
router.get('/', custCtrl.index)
router.get('/:id', custCtrl.show)
router.get('/:id/edit', custCtrl.edit)
router.put('/:id', custCtrl.update)
router.delete('/:id', custCtrl.delete)

module.exports = router;