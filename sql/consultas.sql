-- Nome: Carlos Daniel Rezende Euzébio
-- Questão 1 - Consulta simples usando somente o básico SELECT, FROM, WHERE.
-- Quais são os nomes dos clientes que possuem um e-mail cadastrado?
SELECT nome
FROM Cliente
WHERE email IS NOT NULL;


-- Questão 2 - Consulta usando LIKE.
-- Quais são os produtos cujo nome contém a palavra "morango"?
SELECT nome_produto
FROM Produto
WHERE descrição LIKE '%cremoso%';

-- Questão 3 - Consulta usando operadores de conjuntos (UNION, EXCEPT ou INTERSECT)
-- Quais são os clientes que fizeram uma compra ou foram atendidos?
(SELECT Cliente_código FROM `Detalhes Pedido`)
UNION
(SELECT Cliente_código FROM Atendimento);

-- Questão 4 - Consulta usando um JOIN
-- Quais são os detalhes de pedidos associados aos produtos?
SELECT d.*, p.nome_produto
FROM `Detalhes Pedido` AS d
JOIN Produto AS p ON d.Produto_idProduto = p.idProduto;

-- Questão 5 - Consulta usando mais de um JOIN
-- Quais são os detalhes dos pedidos juntamente com os nomes dos clientes e o tipo de pagamento?
SELECT dp.*, c.nome, pe.tipo_pagamento
FROM `Detalhes Pedido` AS dp
JOIN Pedido AS pe ON dp.Pedido_idPedido = pe.idPedido
JOIN Cliente AS c ON dp.Cliente_código = c.código;

-- Questão 6 - Consulta usando OUTER JOIN
-- Quais são os funcionários que estão associados a uma loja?
SELECT f.nome, lf.loja_idLoja
FROM funcionário AS f
LEFT OUTER JOIN loja_has_funcionário AS lf ON f.CPF = lf.funcionário_CPF;

-- Questão 7 - Consulta usando função de agregação
-- Qual é o número total de vendas?
SELECT COUNT(*) AS total_vendas
FROM Venda;

-- Questão 8 - Consulta usando GROUP BY
-- Quantos produtos diferentes estão presentes no estoque de cada loja?
SELECT e.Produto_idProduto, COUNT(*) AS total_estoque
FROM Estoque AS e
GROUP BY e.Produto_idProduto;

-- Questão 9 - Consulta usando GROUP BY e HAVING
-- Quais são os produtos que têm mais de uma unidade em estoque?
SELECT Produto_idProduto, COUNT(*) AS total_estoque
FROM Estoque
GROUP BY Produto_idProduto
HAVING total_estoque > 1;

SELECT *
FROM Cliente
WHERE código IN (SELECT Cliente_código FROM telefone);

-- Questão 11 - Consulta usando operador EXISTS
-- Quais são os funcionários que têm pelo menos um crachá cadastrado?
SELECT *
FROM funcionário f
WHERE EXISTS (SELECT 1 FROM crachá c WHERE c.funcionário_CPF = f.CPF);

-- Questão 12 - Consulta usando operador SOME
-- Quais são os produtos que têm pelo menos um registro no estoque?
SELECT *
FROM Produto
WHERE idProduto = SOME (SELECT Produto_idProduto FROM Estoque);

-- Questão 13 - Consulta usando operador ALL
-- Quais são os nomes de todos os clientes que são pessoas físicas?
SELECT nome
FROM Cliente
WHERE código = ALL (SELECT Cliente_código FROM `Pessoa física`);

-- Questão 14 - Consulta aninhadas no FROM
-- Quais são os funcionários que estão associados a pelo menos uma loja?
SELECT *
FROM (SELECT * FROM funcionário) f
INNER JOIN loja_has_funcionário lhf ON f.CPF = lhf.funcionário_CPF;

-- Todas as consultas podem ser feitas neste banco de dados:
-- ipaddress: bancodedados-2023-2.czm09dedykvr.us-east-1.rds.amazonaws.com
-- username: admin
-- password: &x#XGp$^5J%AUbdJobGA