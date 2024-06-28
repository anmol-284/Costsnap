// withAuth.js
import React from 'react';
import { getCookie } from './utils';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const token = getCookie('token');
    if (!token) {
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
