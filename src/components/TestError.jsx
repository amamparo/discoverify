import React from 'react';

const TestError = () => {
  throw new Error('This is a test');
  return <div>{'Test Error'}</div>;
};

TestError.propTypes = {};

export default TestError;