require('dotenv').config({path: '../env/.env'});
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('College', 'root', 'root', {
  host: 'localhost',
  dialect: 'mariadb',
});
const Student = sequelize.define('Student', {
  RollNo: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const Teacher = sequelize.define('Teacher', {
  TeacherId: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Department.hasMany(Student);
Student.belongsTo(Department);
Department.hasMany(Teacher);
Teacher.belongsTo(Department);

module.exports = {
  sequelize,
  Department,
  Student,
  Teacher,
};
