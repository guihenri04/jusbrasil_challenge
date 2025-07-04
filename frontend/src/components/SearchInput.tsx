import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_SUGGESTIONS } from '../graphql/queries';
import { SuggestionsList } from './SuggestionsList';
import { useDebounce } from '../hooks/useDebounce';
import { LoadingSpinner } from './LoadingSpinner';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-right: 50px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    padding-right: 45px;
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  pointer-events: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const LoadingContainer = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    right: ${({ theme }) => theme.spacing.sm};
  }
`;

interface Suggestion {
  id: string;
  term: string;
  category: string;
}

interface SearchSuggestionsData {
  searchSuggestions: {
    suggestions: Suggestion[];
    total: number;
    hasMore: boolean;
  };
}

export const SearchInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const debouncedQuery = useDebounce(query, 300);
  
  const [searchSuggestions, { loading }] = useLazyQuery<SearchSuggestionsData>(
    SEARCH_SUGGESTIONS,
    {
      onCompleted: (data) => {
        setSuggestions(data.searchSuggestions.suggestions);
        setShowSuggestions(data.searchSuggestions.suggestions.length > 0);
        setSelectedIndex(-1);
      },
      onError: (error) => {
        console.error('Erro ao buscar sugestões:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      },
    }
  );

  // Executar busca quando o query debounced mudar
  React.useEffect(() => {
    if (debouncedQuery.trim().length >= 1) {
      searchSuggestions({
        variables: {
          input: {
            query: debouncedQuery.trim(),
            limit: 20,
          },
        },
      });
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [debouncedQuery, searchSuggestions]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: Suggestion) => {
    setQuery(suggestion.term);
    setShowSuggestions(false);
    setSelectedIndex(-1);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < Math.min(suggestions.length - 1, 9) ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : Math.min(suggestions.length - 1, 9)
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  }, [showSuggestions, suggestions, selectedIndex, handleSuggestionClick]);

  const handleBlur = useCallback(() => {
    // Adiciona um pequeno delay para permitir que o evento de clique na sugestão
    // seja processado antes do blur fechar a lista.
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  }, []);

  return (
    <SearchContainer>
      <InputContainer>
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder="Digite um termo jurídico (ex: Código Civil)"
          autoComplete="off"
        />
        {loading ? (
          <LoadingContainer>
            <LoadingSpinner size="small" />
          </LoadingContainer>
        ) : (
          <SearchIcon>🔍</SearchIcon>
        )}
      </InputContainer>
      
      {showSuggestions && (
        <SuggestionsList
          suggestions={suggestions.slice(0, 10)} // Mostrar apenas 10
          query={query}
          selectedIndex={selectedIndex}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </SearchContainer>
  );
}; 