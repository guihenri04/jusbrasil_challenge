import React from 'react';
import styled from 'styled-components';
import { SearchContainer } from './components/SearchContainer';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <SearchContainer />
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

export default App; 