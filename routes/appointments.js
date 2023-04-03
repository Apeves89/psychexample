var express = require('express');
var router = express.Router();
const isLoggedIn = require('../config/auth')
const appsCtrl = require('../controllers/appointments')
const provCtrl = require('../controllers/providers')

router.get('/appointments', appsCtrl.index)
router.get('/appointments/new', appsCtrl.new)
router.get('/appointments/:id', appsCtrl.show) 
router.post('/appointments',isLoggedIn, appsCtrl.create) 
router.get('/appointments/:id/edit', appsCtrl.edit) 
router.put('/appointments/:id',isLoggedIn, appsCtrl.update)
router.put('/provider/:id',isLoggedIn,provCtrl.update)
router.delete('/appointments/:id',isLoggedIn, appsCtrl.delete) 

module.exports = router;
