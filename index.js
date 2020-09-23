const express = require('express');
const app = express();
require('dotenv').config({path: './env/.env'});
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
app.use(cors());
const {sequelize, Department, Student, Teacher} = require('./db/init.js');

app.use(express.static('client/build'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

sequelize.sync();

const troute = require('./routes/troutes');
const sroute = require('./routes/sroutes');
const hroute = require('./routes/hod');

app.use('api/student', sroute);
app.use('api/hod', hroute);
app.use('api/teacher', troute);

app.listen(process.env.PORT, (server) => {
  console.info(`Server listen on port ${process.env.PORT}`);
});
