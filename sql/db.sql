DROP DATABASE IF EXISTS blog;
CREATE DATABASE blog;

-- user table
DROP TABLE IF EXISTS blog.user;
CREATE TABLE blog.user (
  id       INT AUTO_INCREMENT PRIMARY KEY
  COMMENT 'id PK',
  username VARCHAR(255) NOT NULL UNIQUE
  COMMENT 'username',
  password VARCHAR(255) NOT NULL
  COMMENT 'password'
)
  COMMENT 'user table';

-- user article
DROP TABLE IF EXISTS blog.article;
CREATE TABLE blog.article (
  id      INT                   AUTO_INCREMENT PRIMARY KEY
  COMMENT 'id PK',
  title   VARCHAR(255) NOT NULL
  COMMENT 'title',
  time    DATETIME     NOT NULL DEFAULT now()
  COMMENT 'post time',
  content MEDIUMTEXT   NOT NULL
  COMMENT 'content',
  photo   VARCHAR(255) COMMENT 'article photo',
  userId  INT          NOT NULL
  COMMENT 'FK'
)
  COMMENT 'article table';

ALTER TABLE blog.article
  ADD CONSTRAINT
  article_fk_userId
FOREIGN KEY (userId)
REFERENCES blog.user (id);

SELECT *
FROM blog.user;

TRUNCATE blog.user;

SELECT *
FROM blog.article;

TRUNCATE blog.article;