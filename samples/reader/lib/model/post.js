module.exports = function (seq, DataTypes) {
  return seq.define('post', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  });
};
