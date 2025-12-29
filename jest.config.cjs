const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',

  // Detect tests anywhere
  testMatch: ['**/?(*.)+(test|spec).[tj]s?(x)'],

  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },

  // Mock CSS + SCSS modules
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',

    // Mock all image imports
    '\\.(png|jpg|jpeg|gif|svg)$': path.resolve(__dirname, '__mocks__/fileMock.js'),
  },

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
