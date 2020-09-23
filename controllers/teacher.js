const jwt = require('jsonwebtoken');
const {Department, Teacher} = require('../db/init.js');
const {v4: uuidv4} = require('uuid');

const tinit = async (req, res) => {
  console.log(req.body);
  const [department] = await Department.findOrCreate({
    where: {name: req.body.dept},
  });
  console.log(department.toJSON());
  const teacher = await Teacher.create({
    TeacherId: uuidv4(),
    Subject: req.body.subject,
    name: req.body.name,
    DepartmentId: department.id,
  });
  const token = jwt.sign({TeacherId: teacher.TeacherId}, 'studentdata123', {
    expiresIn: 60 * 60 * 24 * 365 * 4,
  });
  return res.json({
    instruction: 'Use token in Authorisation header access your data',
    token: token,
  });
};

const tdeets = async (req, res) => {
  try {
    const teeid = jwt.verify(
      req.headers.authorization.substring(7),
      'studentdata123'
    );
  } catch (error) {
    res.json(400, 'Invalid Token');
  }
  const teacher = await Teacher.findOne({
    where: {TeacherId: teeid.TeacherId},
  });
  const dept = await teacher.getDepartment();
  return res.json({teacher, dept});
};

module.exports = {tinit, tdeets};
