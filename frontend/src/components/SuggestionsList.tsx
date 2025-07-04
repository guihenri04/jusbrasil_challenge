import React from 'react';
import styled from 'styled-components';

const SuggestionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top: none;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.lg} ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  max-height: 400px;
  overflow-y: auto;
  z-index: 1000;
`;

const SuggestionItem = styled.div<{ isSelected: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
  transition: all ${({ theme }) => theme.transitions.fast};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  background: ${({ theme, isSelected }) => 
    isSelected ? theme.colors.backgroundAlt : theme.colors.white};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const SuggestionText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const SuggestionCategory = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.gray100};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-left: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const HighlightedText = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

interface Suggestion {
  id: string;
  term: string;
  category: string;
}

interface SuggestionsListProps {
  suggestions: Suggestion[];
  query: string;
  selectedIndex: number;
  onSuggestionClick: (suggestion: Suggestion) => void;
}

const highlightMatch = (text: string, query: string): React.ReactNode => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.trim()})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <HighlightedText key={index}>{part}</HighlightedText>
    ) : (
      part
    )
  );
};

const categoryLabels: Record<string, string> = {
  'legislacao': 'Legislação',
  'principios': 'Princípios',
  'processual': 'Processual',
  'constitucional': 'Constitucional',
  'civil': 'Civil',
  'penal': 'Penal',
  'trabalhista': 'Trabalhista',
  'administrativo': 'Administrativo',
  'tributario': 'Tributário',
  'empresarial': 'Empresarial',
};

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  query,
  selectedIndex,
  onSuggestionClick,
}) => {
  return (
    <SuggestionsContainer>
      {suggestions.map((suggestion, index) => (
        <SuggestionItem
          key={suggestion.id}
          isSelected={index === selectedIndex}
          onClick={() => onSuggestionClick(suggestion)}
          onMouseDown={(e) => e.preventDefault()} // Prevenir blur do input
        >
          <SuggestionText>
            {highlightMatch(suggestion.term, query)}
          </SuggestionText>
          <SuggestionCategory>
            {categoryLabels[suggestion.category] || suggestion.category}
          </SuggestionCategory>
        </SuggestionItem>
      ))}
    </SuggestionsContainer>
  );
}; 