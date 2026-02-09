-- 1
SELECT c.name, c.city, o.course AS book_title, o.price, o.order_date FROM orders AS o JOIN customers AS c ON o.customer_id = c.id WHERE (c.city LIKE '%Bandung%' OR c.city LIKE '%Jakarta%') AND o.price >= 180000 ORDER BY o.price DESC;

-- 2
SELECT c.city, SUM(o.price) AS total_spend FROM orders AS o JOIN customers AS c ON o.customer_id = c.id GROUP BY c.city HAVING SUM(o.price) > 3000000;

-- 3
SELECT c.name, c.city, o.course AS book_title, o.price, o.order_date FROM orders AS o JOIN customers AS c ON o.customer_id = c.id WHERE o.order_date BETWEEN '2024-02-01' AND '2024-03-31' AND course LIKE '%SQL%' ORDER BY o.order_date DESC;

-- 4
SELECT c.name, c.city, COUNT(o.id) AS total_books, SUM(o.price) AS total_spent, ROUND(AVG(o.price)) AS avg_price FROM orders AS o JOIN customers AS c ON o.customer_id = c.id GROUP BY c.id, c.name, c.city HAVING COUNT(o.id) >= 4 ORDER BY total_spent DESC;