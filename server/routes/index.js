const express = require('express');
const userController = require('../controllers/user.controller');
const { userValidationRules, validate } = require('../middlewares/validators');
const isLoggedIn = require('../middlewares/auth');
const doctorController = require('../controllers/doctor.controller');

const router = express.Router();


router.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Doctor API' });
});

// User routes
router.post('/account/signup', userValidationRules(), validate, userController.register);
router.post('/account/signin', userController.login);
router.get('/account/me', isLoggedIn, userController.me);
router.get('/account/profile', isLoggedIn, userController.getProfile);
router.put('/account/profile', isLoggedIn, userController.updateProfile);
router.delete('/account', isLoggedIn, userController.deleteAccount);

// Doctor routes
router.get('/doctors', doctorController.index);


module.exports = router;