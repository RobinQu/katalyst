module.exports = function (seq, DataTypes) {
  return seq.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  });
};
