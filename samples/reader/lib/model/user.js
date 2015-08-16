module.exports = function (seq, DataTypes) {
  return seq.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING
  });
};
