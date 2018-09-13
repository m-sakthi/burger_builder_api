module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


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

  },


  exits: {
    success: {
      statusCode: 200,
    },

    notFound: {
      statusCode: 404,
    },

    unAuthorised: {
      responseType: 'unauthorized',
    }
  },


  fn: async function (inputs, exits) {

    var user = await User.findOne({ email: inputs.email });

    if (!user) { return exits.unAuthorised(); }
    await sails.helpers.passwords.checkPassword(inputs.password, user.password)
    .intercept('incorrect', 'unAuthorised');

    return exits.success({ api_key: JwtAuth.issueToken({ sub: user.id }) });

  }

};