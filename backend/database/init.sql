-- Criar extensão para busca full-text em português
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS unaccent;

-- Criar tabela de sugestões
CREATE TABLE IF NOT EXISTS suggestions (
    id SERIAL PRIMARY KEY,
    term VARCHAR(255) NOT NULL UNIQUE,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar índice para busca rápida
CREATE INDEX IF NOT EXISTS idx_suggestions_term_gin ON suggestions USING gin (term gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_suggestions_term_text ON suggestions USING gin (to_tsvector('portuguese', term));

-- Inserir dados de teste - Termos Jurídicos Brasileiros
INSERT INTO suggestions (term, category) VALUES
-- Leis e Códigos
('Código Civil Brasileiro', 'legislacao'),
('Código Penal Brasileiro', 'legislacao'),
('Código de Processo Civil', 'legislacao'),
('Código de Processo Penal', 'legislacao'),
('Código Tributário Nacional', 'legislacao'),
('Código de Defesa do Consumidor', 'legislacao'),
('Consolidação das Leis do Trabalho', 'legislacao'),
('Constituição Federal de 1988', 'legislacao'),
('Lei Maria da Penha', 'legislacao'),
('Lei Seca', 'legislacao'),

-- Princípios Jurídicos
('Princípio da Legalidade', 'principios'),
('Princípio da Moralidade', 'principios'),
('Princípio da Impessoalidade', 'principios'),
('Princípio da Publicidade', 'principios'),
('Princípio da Eficiência', 'principios'),
('Princípio do Devido Processo Legal', 'principios'),
('Princípio da Ampla Defesa', 'principios'),
('Princípio do Contraditório', 'principios'),
('Princípio da Presunção de Inocência', 'principios'),
('Princípio da Dignidade da Pessoa Humana', 'principios'),

-- Termos Processuais
('Ação de Indenização', 'processual'),
('Ação de Cobrança', 'processual'),
('Ação de Despejo', 'processual'),
('Ação de Usucapião', 'processual'),
('Ação Rescisória', 'processual'),
('Agravo de Instrumento', 'processual'),
('Apelação Cível', 'processual'),
('Embargos à Execução', 'processual'),
('Mandado de Segurança', 'processual'),
('Habeas Corpus', 'processual'),

-- Direito Constitucional
('Supremo Tribunal Federal', 'constitucional'),
('Superior Tribunal de Justiça', 'constitucional'),
('Tribunal Superior do Trabalho', 'constitucional'),
('Controle de Constitucionalidade', 'constitucional'),
('Ação Direta de Inconstitucionalidade', 'constitucional'),
('Arguição de Descumprimento de Preceito Fundamental', 'constitucional'),
('Recurso Extraordinário', 'constitucional'),
('Recurso Especial', 'constitucional'),
('Repercussão Geral', 'constitucional'),
('Súmula Vinculante', 'constitucional'),

-- Direito Civil
('Responsabilidade Civil', 'civil'),
('Contratos Empresariais', 'civil'),
('Direitos Reais', 'civil'),
('Direito de Família', 'civil'),
('Direito das Sucessões', 'civil'),
('Danos Morais', 'civil'),
('Danos Materiais', 'civil'),
('Boa-fé Objetiva', 'civil'),
('Função Social do Contrato', 'civil'),
('Vícios Redibitórios', 'civil'),

-- Direito Penal
('Homicídio Qualificado', 'penal'),
('Latrocínio', 'penal'),
('Extorsão Mediante Sequestro', 'penal'),
('Tráfico de Drogas', 'penal'),
('Lavagem de Dinheiro', 'penal'),
('Crime Contra a Ordem Tributária', 'penal'),
('Crime de Responsabilidade', 'penal'),
('Dosimetria da Pena', 'penal'),
('Regime Fechado', 'penal'),
('Regime Semiaberto', 'penal'),

-- Direito Trabalhista
('Contrato de Trabalho', 'trabalhista'),
('Justa Causa', 'trabalhista'),
('Aviso Prévio', 'trabalhista'),
('Fundo de Garantia do Tempo de Serviço', 'trabalhista'),
('Adicional de Insalubridade', 'trabalhista'),
('Adicional de Periculosidade', 'trabalhista'),
('Horas Extras', 'trabalhista'),
('Equiparação Salarial', 'trabalhista'),
('Estabilidade Provisória', 'trabalhista'),
('Dano Moral Trabalhista', 'trabalhista'),

-- Direito Administrativo
('Licitação Pública', 'administrativo'),
('Concurso Público', 'administrativo'),
('Processo Administrativo', 'administrativo'),
('Ato Administrativo', 'administrativo'),
('Poder de Polícia', 'administrativo'),
('Desapropriação', 'administrativo'),
('Concessão de Serviço Público', 'administrativo'),
('Improbidade Administrativa', 'administrativo'),
('Controle Externo', 'administrativo'),
('Responsabilidade Civil do Estado', 'administrativo'),

-- Direito Tributário
('Imposto sobre a Renda', 'tributario'),
('Imposto sobre Circulação de Mercadorias', 'tributario'),
('Imposto sobre Serviços', 'tributario'),
('Contribuição Social sobre o Lucro Líquido', 'tributario'),
('Programa de Integração Social', 'tributario'),
('Contribuição para Financiamento da Seguridade Social', 'tributario'),
('Execução Fiscal', 'tributario'),
('Parcelamento Tributário', 'tributario'),
('Compensação Tributária', 'tributario'),
('Repetição do Indébito Tributário', 'tributario'),

-- Direito Empresarial
('Sociedade Anônima', 'empresarial'),
('Sociedade Limitada', 'empresarial'),
('Microempreendedor Individual', 'empresarial'),
('Falência e Recuperação Judicial', 'empresarial'),
('Propriedade Intelectual', 'empresarial'),
('Marca e Patente', 'empresarial'),
('Direito Concorrencial', 'empresarial'),
('Conselho Administrativo de Defesa Econômica', 'empresarial'),
('Fusão e Aquisição', 'empresarial'),
('Acordo de Acionistas', 'empresarial')

ON CONFLICT (term) DO NOTHING;

-- Criar função para busca otimizada (corrigindo tipos)
CREATE OR REPLACE FUNCTION search_suggestions(search_term TEXT, max_results INTEGER DEFAULT 20)
RETURNS TABLE(id INTEGER, term VARCHAR(255), category VARCHAR(100)) AS $$
BEGIN
    RETURN QUERY
    SELECT s.id, s.term, s.category
    FROM suggestions s
    WHERE s.term ILIKE '%' || search_term || '%'
    ORDER BY 
        CASE 
            WHEN s.term ILIKE search_term || '%' THEN 1  -- Começa com o termo
            WHEN s.term ILIKE '%' || search_term || '%' THEN 2  -- Contém o termo
            ELSE 3
        END,
        similarity(s.term, search_term) DESC,
        s.term
    LIMIT max_results;
END;
$$ LANGUAGE plpgsql; 