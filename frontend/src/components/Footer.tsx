import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.gray800};
  color: ${({ theme }) => theme.colors.gray300};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  transition: color ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryLight};
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          Desenvolvido para o desafio técnico da{' '}
          <FooterLink href="https://jusbrasil.com.br" target="_blank" rel="noopener noreferrer">
            JusBrasil
          </FooterLink>
          {' '}• Powered by React + GraphQL
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
}; 