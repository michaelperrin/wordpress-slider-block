module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": "off",
    "import/no-extraneous-dependencies": ["off"],
    "import/no-unresolved": ["error", { ignore: ['^\@wordpress'] }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  },
};
