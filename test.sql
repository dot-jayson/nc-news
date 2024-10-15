\c nc_news_test

UPDATE articles
  SET votes = votes + -10
  WHERE article_id = 1
  RETURNING *;