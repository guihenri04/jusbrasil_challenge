# Desafio JusBrasil - Sistema de Busca com Auto-Completar

Este repositório contém a implementação de um sistema de busca com auto-completar, desenvolvido como parte do desafio técnico da JusBrasil.

## Tecnologias

- **Frontend**: React 18 com TypeScript, Styled Components para estilização e Apollo Client para comunicação com a API.
- **Backend**: API em Node.js com Express, Apollo Server para servir a interface GraphQL e TypeGraphQL para a criação do schema.
- **Banco de Dados**: PostgreSQL, otimizado para buscas textuais com a extensão `pg_trgm`.
- **Containerização**: Docker e Docker Compose para garantir um ambiente de desenvolvimento e execução consistente e de fácil configuração.

## Funcionalidades Implementadas

- **Busca Dinâmica**: As sugestões são atualizadas em tempo real conforme o usuário digita.
- **Requisitos de Exibição**:
    - As sugestões aparecem após a digitação de no mínimo 4 caracteres.
    - O backend retorna um máximo de 20 sugestões, com 10 sendo visíveis inicialmente e as demais acessíveis via scroll.
- **Interface Intuitiva**:
    - O termo pesquisado é destacado em negrito nas sugestões.
    - Há feedback visual (hover/touch) ao interagir com as sugestões.
    - A interface é responsiva e se adapta a dispositivos móveis.
- **Persistência Automatizada**: O banco de dados é populado automaticamente com um conjunto de termos jurídicos no primeiro boot do container.

## Como Executar o Projeto

A forma mais simples e recomendada de executar o projeto é utilizando Docker.

**Pré-requisitos**:
- Docker
- Docker Compose

**Passos**:

```bash
# 1. Clone o repositório
git clone <url-do-seu-repositorio>
cd desafio_jusbrasil

# 2. Suba os serviços com Docker Compose
# O comando '--build' garante que as imagens serão construídas do zero.
docker compose up --build
```

Após a execução, os serviços estarão disponíveis nos seguintes endereços:

- **Aplicação Frontend**: `http://localhost:3000`
- **Playground GraphQL**: `http://localhost:4000/graphql`
- **API Health Check**: `http://localhost:4000/health`

## Estrutura do Projeto

```
desafio_jusbrasil/
├── backend/           # Código da API GraphQL (Node.js, Express, Apollo)
├── frontend/          # Código da aplicação (React, TypeScript)
├── .env               # Arquivo de exemplo para variáveis de ambiente
├── .gitignore         # Arquivos e pastas ignorados pelo Git
├── COMMENTS.md        # Detalhes sobre as decisões técnicas e arquitetura
├── docker-compose.yml # Orquestração dos containers
└── README.md          # Este arquivo
```

## Documentação de Decisões Técnicas

Para uma análise detalhada sobre as escolhas de arquitetura, bibliotecas, otimizações de performance e possíveis melhorias futuras, consulte o arquivo [COMMENTS.md](./COMMENTS.md). 