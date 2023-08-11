SELECT title, COUNT(title)
FROM songs
GROUP BY title
HAVING COUNT(title)> 1;



DELETE FROM songs
WHERE (HAVING COUNT(title))> 1;