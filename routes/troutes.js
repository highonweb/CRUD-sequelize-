const express = require('express');
const router = express.Router();
const {tinit, tdeets, tupdate, tdel} = require('../controllers/teacher.js');
router.post('/new', tinit);
router.get('/', tdeets);
router.post('/chng', tupdate);
router.post('/kill', tdel);
module.exports = router;
