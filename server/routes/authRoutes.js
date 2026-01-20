const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
// La ruta de registro solo procesará Visitors
router.post('/register/visitor', authController.registerVisitor);

module.exports = router;