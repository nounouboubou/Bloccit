'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advertisements = sequelize.define('advertisements', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Advertisements.associate = function(models) {
    // associations can be defined here
  };
  return Advertisements;
};