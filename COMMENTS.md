# Notas sobre a Implementação e Decisões Técnicas

Este documento detalha as principais decisões de arquitetura e implementação tomadas durante o desenvolvimento do projeto de auto-completar.

## Arquitetura e Tecnologias

A arquitetura foi dividida em três componentes principais orquestrados pelo Docker Compose: frontend, backend e banco de dados.

### Frontend: React com TypeScript

- **Justificativa**: A escolha do React foi um requisito do desafio. A adição do TypeScript se deu pela segurança de tipos, que reduz a probabilidade de erros em tempo de execução e melhora a manutenibilidade do código, especialmente em uma aplicação que lida com interações complexas de estado. Foram utilizados componentes funcionais com Hooks (`useState`, `useEffect`, `useCallback`) por serem o padrão moderno do React.
- **Estilização**: Optei por Styled Components devido à sua capacidade de criar componentes com escopo de estilização bem definido, evitando conflitos de CSS e facilitando a criação de uma interface responsiva e manutenível.

### Backend: Node.js com Apollo Server e TypeGraphQL

- **Justificativa**: O uso de GraphQL também era um requisito. Escolhi o Apollo Server por ser uma solução robusta e amplamente adotada para criar servidores GraphQL em Node.js. Para a construção do schema, a biblioteca `type-graphql` foi utilizada para permitir a criação de tipos e resolvers diretamente a partir de classes TypeScript, o que simplifica o desenvolvimento, garante a consistência entre o código e o schema GraphQL e habilita o uso de recursos como injeção de dependência e decorators.

### Banco de Dados: PostgreSQL

- **Justificativa**: Para a persistência dos dados, o PostgreSQL foi escolhido por seu suporte nativo e eficiente a buscas textuais. A extensão `pg_trgm` foi habilitada para criar índices GIN (Generalized Inverted Index), que são altamente otimizados para buscas de similaridade e `ILIKE`, tornando a consulta de auto-completar performática mesmo com um grande volume de dados. A população do banco é feita de forma automatizada através de um script `init.sql`, garantindo que o ambiente de teste seja facilmente replicável.

## Detalhes de Implementação

### Performance e Experiência do Usuário

- **Debounce de Requisições**: Para evitar um número excessivo de requisições à API enquanto o usuário digita, foi implementado um `debounce` de 300ms no input de busca através do hook customizado `useDebounce`. Isso garante que a busca só seja disparada após o usuário fazer uma pausa na digitação, otimizando recursos do backend e do frontend.
- **Ordenação por Relevância**: A função `search_suggestions` no PostgreSQL foi desenhada para ordenar os resultados de forma inteligente. Termos que começam com o texto pesquisado têm prioridade sobre termos que apenas contêm o texto, melhorando a relevância das sugestões. A função `similarity` do `pg_trgm` é usada como critério secundário de ordenação.
- **Feedback Visual**: A interface fornece feedback constante ao usuário. Um indicador de loading é exibido durante a busca, e as sugestões são destacadas com `hover` ou navegação por teclado.

### Organização do Código

- **Frontend**: A estrutura de componentes foi pensada para ser modular e reutilizável. O estado global e a lógica de busca são gerenciados pelo `Apollo Client`, enquanto componentes menores se encarregam da UI.
- **Backend**: O código foi organizado separando os `resolvers`, `types` e `services`, seguindo uma arquitetura limpa que facilita a manutenção e a adição de novas funcionalidades.

## Testes e Validações

- **Testes Manuais**: Foram realizados testes manuais extensivos para validar todos os requisitos funcionais, como o número de caracteres para iniciar a busca, o limite de sugestões, o funcionamento do scroll, a responsividade e o destaque de texto.
- **Testes Automatizados (Próximos Passos)**: Se houvesse mais tempo, o próximo passo seria implementar uma suíte de testes automatizados.
  - **Frontend**: Testes unitários para componentes com Jest e React Testing Library para validar a renderização e o comportamento de componentes isolados (ex: `highlightMatch`). Testes de integração para validar o fluxo completo de busca.
  - **Backend**: Testes de integração para os resolvers do GraphQL, utilizando um banco de dados de teste para garantir que as queries retornam os dados esperados.

## Possíveis Melhorias Futuras

Se o projeto continuasse a ser desenvolvido, estas seriam algumas das melhorias a serem consideradas:

1.  **Cache Avançado**: Implementar um cache mais robusto no backend com Redis. Isso reduziria a carga no banco de dados para buscas frequentes e melhoraria ainda mais a velocidade de resposta.
2.  **Busca Fuzzy**: Para uma experiência de busca mais tolerante a erros de digitação, a substituição ou complementação da busca `ILIKE` por uma solução mais poderosa como Elasticsearch ou Typesense seria ideal.
3.  **Analytics de Busca**: Integrar um sistema de analytics para monitorar os termos mais buscados, buscas sem resultado e o comportamento do usuário. Esses dados seriam valiosos para otimizar o conjunto de dados e a relevância das sugestões.
4.  **Paginação Infinita**: Em vez de limitar o scroll a 10 de 20 sugestões, implementar uma paginação "infinita" no frontend, que buscaria mais resultados do backend conforme o usuário rolasse a lista.
5.  **Testes de Performance**: Realizar testes de carga no backend com ferramentas como k6 ou Artillery para identificar e otimizar gargalos de performance sob alta concorrência. 