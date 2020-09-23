const express = require('express');
const router = express.Router();
const {tinit, tdeets} = require('../controllers/teacher.js');
router.post('/new', tinit);
router.get('/', tdeets);
router.post('/update');
module.exports = router;
