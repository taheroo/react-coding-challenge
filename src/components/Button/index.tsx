import React from 'react';
import styles from './Button.module.css';

interface Props {
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  className?: string;
}

const Button: React.FC<Props> = ({
  disabled = false,
  onClick,
  text,
  className = styles.button,
}) => (
  <button
    type="button"
    className={className}
    disabled={disabled}
    onClick={onClick}
  >
    {text}
  </button>
);

export default Button;
