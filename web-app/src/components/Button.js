import React, { memo } from 'react';

const Button = memo(({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
