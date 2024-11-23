module.exports = {
  testEnvironment: "node",
  verbose: true,
};

require('dotenv').config({ path: './.env.test' }); // or whichever environment file you're using for tests
