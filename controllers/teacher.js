const jwt = require('jsonwebtoken');
const {Department, Teacher} = require('../db/init.js');
const {v4: uuidv4} = require('uuid');

//#region Create
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
    instruction: 'Use this token in Authorisation header to access your data',
    token: 'Bearer ' + token,
  });
};
//#endregion

//#region Read
const tdeets = async (req, res) => {
  try {
    var teeid = jwt.verify(
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
//#endregion

//#region Update
const tupdate = async (req, res) => {
  console.log(req.headers);

  try {
    var teeid = jwt.verify(
      req.headers.authorization.substring(7),
      'studentdata123'
    );
  } catch (error) {
    res.json(400, 'Invalid Token');
  }
  const teacher = await Teacher.findOne({
    where: {TeacherId: teeid.TeacherId},
  });
  if (req.body.name) {
    teacher.name = req.body.name;
  }
  if (req.body.subject) {
    teacher.Subject = req.body.subject;
  }
  teacher.save();
  console.log(teacher.toJSON());
  const dept = await teacher.getDepartment();
  return res.json({teacher, dept});
};
//#endregion

//#region Delete
const tdel = async (req, res) => {
  console.log(req.headers);

  try {
    var teeid = jwt.verify(
      req.headers.authorization.substring(7),
      'studentdata123'
    );
  } catch (error) {
    res.json(400, 'Invalid Token');
  }
  await Teacher.destroy({
    where: {TeacherId: teeid.TeacherId},
  });
  return res.json('You are terminated');
};
//#endregion

module.exports = {tinit, tdeets, tdel, tupdate};
