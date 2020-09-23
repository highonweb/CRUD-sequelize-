const jwt = require('jsonwebtoken');
const {Department, Student} = require('../db/init.js');

//#region Create
const sinit = async (req, res) => {
  const [department] = await Department.findOrCreate({
    where: {name: req.body.dept},
  });
  const student = await Student.create({
    RollNo: req.body.rollno,
    name: req.body.name,
    DepartmentId: department.id,
  });
  const token = jwt.sign({RollNo: student.RollNo}, 'studentdata123', {
    expiresIn: 60 * 60 * 24 * 365 * 4,
  });
  return res.json({
    instruction: 'Use this token in Authorisation header to access your data',
    token: 'Bearer ' + token,
  });
};
//#endregion

//#region Read
const sdeets = async (req, res) => {
  try {
    var sturoll = jwt.verify(
      req.headers.authorization.substring(7),
      'studentdata123'
    );
  } catch (error) {
    res.json(400, 'Invalid Token');
  }
  const student = await Student.findOne({
    where: {RollNo: sturoll.RollNo},
  });
  const dept = await student.getDepartment();
  return res.json({student, dept});
};
//#endregion

//#region  Update
const supdate = async (req, res) => {
  try {
    var sturoll = jwt.verify(
      req.headers.authorization.substring(7),
      'studentdata123'
    );
  } catch (error) {
    res.json(400, 'Invalid Token');
  }

  const student = await Student.findOne({
    where: {RollNo: sturoll.RollNo},
  });
  student.name = req.body.name;
  student.save();
  const dept = await student.getDepartment();
  return res.json({student, dept});
};
//#endregion

//#region Delete
const sdel = async (req, res) => {
  try {
    var sturoll = jwt.verify(
      req.headers.authorization.substring(7),
      'studentdata123'
    );
  } catch (error) {
    res.json(400, 'Invalid Token');
  }
  const student = await Student.destroy({
    where: {RollNo: sturoll.RollNo},
  });
  return res.json('You are terminated');
};
//#endregion

module.exports = {sinit, sdeets, supdate, sdel};
