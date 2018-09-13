module.exports = {


  friendlyName: 'Signup',


  description: 'Signup user.',


  inputs: {

    email: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    name:  {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    }

  },

  exits: {

  	success: {
      statusCode: 201,
    },

    // invalid: {
    //   responseType: 'badRequest',
    //   description: 'The provided fullName, password and/or email address are invalid.',
    // },

    emailAlreadyInUse: {
      responseType: 'badRequest',
      description: 'The provided email address is already in use.',
    },

  },


  fn: async function (inputs, exits) {

  	var newEmailAddress = inputs.email.toLowerCase();

  	var newUser = await User.create({
  		email: newEmailAddress,
  		password: await sails.helpers.passwords.hashPassword(inputs.password),
  		name: inputs.name
  	})
  	.intercept('E_UNIQUE', 'emailAlreadyInUse')
  	// .intercept({name: 'UsageError'}, 'invalid')
  	// .intercept((err) => {
  	// 	return err;
  	// })
  	.fetch()

  	console.log(newUser);

    return exits.success(newUser);

  }

};
