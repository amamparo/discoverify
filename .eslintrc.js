module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 7,
    sourceType: 'module',
    impliedStrict: true
  },
  plugins: [
    'react',
  ],
  rules: {
    'brace-style': [
      2,
      '1tbs',
      {
        'allowSingleLine': true
      }
    ],
    'comma-dangle': 0,
    curly: 2,
    'jsx-quotes': [
      2,
      'prefer-single',
    ],
    'no-const-assign': 2,
    'object-curly-spacing': [
      2,
      'never'
    ],
    'prefer-const': 0,
    'quote-props': [
      0,
      'always'
    ],
    'react/no-deprecated': 2,
    'react/no-unused-prop-types': 2,
    'react/prop-types': 2,
    'react/jsx-closing-bracket-location': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/jsx-curly-spacing': [
      2,
      'never'
    ],
    'react/jsx-filename-extension': 2,
    'react/jsx-key': 2,
    'react/jsx-no-literals': 0,
    'react/jsx-no-undef': 2,
    'react/jsx-tag-spacing': 0,
    'react/jsx-uses-react': 2,
    'react/jsx-uses-vars': 2,
    'react/jsx-wrap-multilines': 2,
    'react/react-in-jsx-scope': 2,
    'react/self-closing-comp': 2,
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'template-curly-spacing': [
      2,
      'never'
    ],
  },
};