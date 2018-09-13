/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'carol.reyna@microsoft.com'
    },

    password: {
      type: 'string',
      required: true,
      columnName: 'encryptedPassword',
      description: 'Securely hashed representation of the user\'s login password.',
      protect: true,
      example: '2$28a8eabna301089103-13948134nad'
    },

    name: {
      type: 'string',
      required: true,
      description: 'Full representation of the user\'s name',
      maxLength: 120,
      example: 'Lisa Microwave van der Jenny'
    },

  },

  customToJSON: function() {
    return _.omit(this, ['password'])
  },

  // beforeCreate: function(values, cb){
  //   var hash = bcrypt.hashSync(values.password, 10);
  //   values.password = hash;
  //   console.log("while create: " + "salt" + " " + values.password)
  //   cb();
  // },

  comparePassword: function(password, user) {
    return bcrypt.compareSync(password, user.password);
  }

};

