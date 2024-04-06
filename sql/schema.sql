-- deleta tabelas se existirem
DROP TABLE IF EXISTS sabores CASCADE;
DROP TABLE IF EXISTS pedidos CASCADE;
DROP TABLE IF EXISTS sabores_pedidos CASCADE;

-- Cria a tabela Sabores
CREATE TABLE sabores (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    tipo TEXT NOT NULL,
    vegano BOOLEAN DEFAULT FALSE,
    sem_lactose BOOLEAN DEFAULT FALSE,
    preco NUMERIC(5,2) NOT NULL
);

-- Cria a tabela Pedidos
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL, -- FK para a tabela Clientes (se existir)
    data_hora TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    valor_total NUMERIC(7,2) NOT NULL,
    status TEXT NOT NULL -- Ex: Aguardando pagamento, Em preparo, Pronto para entrega, Entregue
);

-- Cria a tabela Sabores_Pedidos
CREATE TABLE sabores_pedidos (
    id SERIAL PRIMARY KEY,
    sabor_id INTEGER NOT NULL, -- FK para a tabela Sabores
    pedido_id INTEGER NOT NULL, -- FK para a tabela Pedidos
    quantidade INTEGER NOT NULL
);

-- Adiciona constraints de chave estrangeira
ALTER TABLE sabores_pedidos
    ADD CONSTRAINT fk_sabores_pedidos_sabor_id
    FOREIGN KEY (sabor_id)
    REFERENCES sabores (id),
    ADD CONSTRAINT fk_sabores_pedidos_pedido_id
    FOREIGN KEY (pedido_id)
    REFERENCES pedidos (id);