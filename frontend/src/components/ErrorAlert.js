import React from 'react';
import '../styles/ErrorAlert.css';

const ErrorAlert = ({ message }) => {
  return (
    <div className="error-alert">
      <span>⚠️ {message}</span>
    </div>
  );
};

export default ErrorAlert;
