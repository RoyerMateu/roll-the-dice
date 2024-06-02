import React from 'react';

function ButtonGame({ variant, onClick, children, disabled = false }) {
  let textColor, bgColor;
  // Asignar colores según la variante
  switch (variant) {
    case 'primary':
      textColor = 'white';
      bgColor = '#FF2EEA';
      break;
    case 'secondary':
      textColor = '#FF2EEA';
      bgColor = 'white';
      break;
    case 'terciary':
      textColor = 'white';
      bgColor = '#3FD2E6';
      break;
    default:
      textColor = 'white';
      bgColor = 'black';
  }

  const disabledBgColor = '#999';
  const disabledTextColor = '#ccc';

  const buttonStyle = {
    color: disabled ? disabledTextColor : textColor,
    backgroundColor: disabled ? disabledBgColor : bgColor,
    padding: '8px 16px',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
    fontSize: '20px'
  };

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default ButtonGame;
