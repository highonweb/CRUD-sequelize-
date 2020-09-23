const express = require('express');
const router = express.Router();
const {Department} = require('../db/init.js');

const home = async (req, res) => {
  console.log(req.body);
  const [department, created] = await Department.findOrCreate({
    where: {name: req.body.dept},
  });
  let students = await department.getStudents();
  let teachers = await department.getTeachers();
  return res.json({teachers, students});
};

router.get('/', home);
module.exports = router;
