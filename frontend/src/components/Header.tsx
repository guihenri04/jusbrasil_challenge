import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Logo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.white};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.spacing.xs} 0 0 0;
  opacity: 0.9;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

export const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>⚖️</Logo>
        <div>
          <Title>Busca Jurídica</Title>
          <Subtitle>Sistema de auto-completar para pesquisa de termos jurídicos</Subtitle>
        </div>
      </HeaderContent>
    </HeaderContainer>
  );
}; 