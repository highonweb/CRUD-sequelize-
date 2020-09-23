const express = require('express');
const router = express.Router();
const {sinit, sdeets} = require('../controllers/student.js');
router.post('/new', sinit);
router.get('/', sdeets);
module.exports = router;
