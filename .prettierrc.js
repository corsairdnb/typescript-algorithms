module.exports = {
  singleQuote: true,
  arrowParens: 'always',
  printWidth: 100,
  overrides: [
    {
      files: ['.prettierrc', '.babelrc', '.eslintrc'],
      options: {
        parser: 'json'
      }
    }
  ],
  quoteProps: 'preserve',
  trailingComma: 'none'
};
