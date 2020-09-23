const jwt = require('jsonwebtoken');
const {Department, Student} = require('../db/init.js');

const sinit = async (req, res) => {
  console.log(req.body);
  const [department] = await Department.findOrCreate({
    where: {name: req.body.dept},
  });
  console.log(department.toJSON());
  const student = await Student.create({
    RollNo: req.body.rollno,
    name: req.body.name,
    DepartmentId: department.id,
  });
  const token = jwt.sign({RollNo: student.RollNo}, 'studentdata123', {
    expiresIn: 60 * 60 * 24 * 365 * 4,
  });
  return res.json({
    instruction: 'Use token in Authorisation header access your data',
    token: token,
  });
};

const sdeets = async (req, res) => {
  console.log(req.headers);

  try {
    const sturoll = jwt.verify(
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

module.exports = {sinit, sdeets};
