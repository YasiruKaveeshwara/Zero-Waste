module.exports = {
  // Set the environment to jsdom or node depending on your needs. Use 'node' for backend testing.
  testEnvironment: 'node',

  // Specify how to transform files before running tests
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use babel-jest to transform JavaScript and JSX files using Babel
  },

  // Ignore transforming node_modules, but allow axios (and other modules if needed) to be transformed
  transformIgnorePatterns: [
    'node_modules/(?!axios)', // Ignore all node_modules except for axios, since it uses ES modules
  ],

  // Map static assets like CSS, images, etc., to mock files during testing
  moduleNameMapper: {
    '\\.(css|jpg|png)$': '<rootDir>/__mocks__/fileMock.js', // Mock CSS and image files
  },

  // Automatically clear mocks after every test
  clearMocks: true,
};
