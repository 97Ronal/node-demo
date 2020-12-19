'use strict';

// /** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.validate = {
  enable: false,
  package: 'egg-validate',
};

exports.oss = {
  enable: true,
  package: 'egg-oss',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
