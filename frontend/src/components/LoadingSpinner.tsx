import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div<{ size: 'small' | 'medium' | 'large' }>`
  border: 2px solid ${({ theme }) => theme.colors.gray200};
  border-top: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'width: 16px; height: 16px; border-width: 2px;';
      case 'medium':
        return 'width: 24px; height: 24px; border-width: 2px;';
      case 'large':
        return 'width: 32px; height: 32px; border-width: 3px;';
      default:
        return 'width: 24px; height: 24px; border-width: 2px;';
    }
  }}
`;

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium' 
}) => {
  return <Spinner size={size} />;
}; 