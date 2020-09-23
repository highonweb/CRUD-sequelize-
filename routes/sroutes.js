const express = require('express');
const router = express.Router();
const {sinit, sdeets, supdate, sdel} = require('../controllers/student.js');
router.post('/new', sinit);
router.get('/', sdeets);
router.post('/chng', supdate);
router.post('/kill', sdel);
module.exports = router;
