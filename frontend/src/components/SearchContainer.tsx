import React from 'react';
import styled from 'styled-components';
import { SearchInput } from './SearchInput';

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 500px;
    padding: ${({ theme }) => theme.spacing.xl};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  margin: 0 0 ${({ theme }) => theme.spacing.xl} 0;
  line-height: 1.5;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

export const SearchContainer: React.FC = () => {
  return (
    <Container>
      <Title>🔍 Busca Inteligente</Title>
      <Description>
        Digite pelo menos 4 caracteres para ver sugestões de termos jurídicos
      </Description>
      <SearchInput />
    </Container>
  );
}; 