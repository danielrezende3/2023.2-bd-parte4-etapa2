-- 10 Sabores
INSERT INTO sabores (nome, descricao, tipo, vegano, sem_lactose, preco) VALUES
('Morango', 'Sabor clássico de morango.', 'Frutas', TRUE, TRUE, 7.50),
('Chocolate', 'Sabor intenso de chocolate.', 'Chocolate', FALSE, FALSE, 8.00),
('Baunilha', 'Sabor suave de baunilha.', 'Tradicional', FALSE, TRUE, 6.50),
('Limão', 'Sabor refrescante de limão.', 'Frutas', FALSE, TRUE, 7.00),
('Maracujá', 'Sabor ácido e tropical de maracujá.', 'Frutas', TRUE, FALSE, 7.50),
('Brigadeiro', 'Sabor cremoso de brigadeiro.', 'Chocolate', FALSE, FALSE, 8.50),
('Doce de leite', 'Sabor cremoso de doce de leite.', 'Tradicional', FALSE, TRUE, 8.00),
('Nozes', 'Sabor crocante de nozes.', 'Outros', FALSE, FALSE, 9.00),
('Pistache', 'Sabor exótico de pistache.', 'Outros', TRUE, FALSE, 9.50),
('Caramel com flor de sal', 'Sabor equilibrado de caramelo com flor de sal.', 'Outros', FALSE, FALSE, 9.00);


-- 10 Pedidos
INSERT INTO pedidos (cliente_id, data_hora, valor_total, status) VALUES
(1, '2024-04-03 10:00:00', 25.00, 'Aguardando pagamento'),
(2, '2024-04-03 11:00:00', 30.00, 'Em preparo'),
(3, '2024-04-03 12:00:00', 20.00, 'Pronto para entrega'),
(4, '2024-04-03 13:00:00', 35.00, 'Entregue'),
(5, '2024-04-03 14:00:00', 22.00, 'Aguardando pagamento'),
(6, '2024-04-03 15:00:00', 28.00, 'Em preparo'),
(7, '2024-04-03 16:00:00', 21.00, 'Pronto para entrega'),
(8, '2024-04-03 17:00:00', 33.00, 'Entregue'),
(9, '2024-04-03 18:00:00', 24.00, 'Aguardando pagamento'),
(10, '2024-04-03 19:00:00', 29.00, 'Em preparo');

-- 10 Sabores_Pedidos
INSERT INTO sabores_pedidos (sabor_id, pedido_id, quantidade) VALUES
(1, 1, 2),
(2, 1, 1),
(3, 2, 3),
(4, 2, 2),
(5, 3, 1),
(6, 3, 2),
(7, 4, 3),
(8, 4, 1),
(9, 5, 2),
(10, 5, 1);