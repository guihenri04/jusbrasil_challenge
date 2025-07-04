import { Resolver, Query, Arg } from 'type-graphql';
import { Suggestion, SearchSuggestionsInput, SearchSuggestionsResponse } from '../types/Suggestion';
import { DatabaseService } from '../services/DatabaseService';

@Resolver()
export class SuggestionResolver {
  
  @Query(() => SearchSuggestionsResponse)
  async searchSuggestions(
    @Arg('input') input: SearchSuggestionsInput
  ): Promise<SearchSuggestionsResponse> {
    const { query, limit = 20 } = input;

    // Validar entrada
    if (!query || query.trim().length < 1) {
      return {
        suggestions: [],
        total: 0,
        hasMore: false,
      };
    }

    try {
      // Buscar sugestões usando a função otimizada
      const result = await DatabaseService.query(
        'SELECT * FROM search_suggestions($1, $2)',
        [query.trim(), limit]
      );

      const suggestions: Suggestion[] = result.rows.map((row: any) => ({
        id: row.id,
        term: row.term,
        category: row.category,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      // Contar total de resultados possíveis (sem limit)
      const countResult = await DatabaseService.query(
        `SELECT COUNT(*) as total 
         FROM suggestions 
         WHERE term ILIKE $1`,
        [`%${query.trim()}%`]
      );

      const total = parseInt(countResult.rows[0].total);
      const hasMore = total > limit;

      return {
        suggestions,
        total,
        hasMore,
      };

    } catch (error) {
      console.error('Erro ao buscar sugestões:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  @Query(() => [Suggestion])
  async getAllSuggestions(): Promise<Suggestion[]> {
    try {
      const result = await DatabaseService.query(
        'SELECT * FROM suggestions ORDER BY term LIMIT 100'
      );

      return result.rows.map((row: any) => ({
        id: row.id,
        term: row.term,
        category: row.category,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }));
    } catch (error) {
      console.error('Erro ao buscar todas as sugestões:', error);
      throw new Error('Erro interno do servidor');
    }
  }

  @Query(() => String)
  async healthCheck(): Promise<string> {
    return 'Backend funcionando! 🚀';
  }
} 