\c nc_news_test

SELECT 
  comments.comment_id,
  comments.votes,
  comments.created_at,
  comments.author,
  comments.body,
  comments.article_id
FROM 
  comments
WHERE
  comments.article_id = 1
ORDER BY
  comments.created_at DESC;
