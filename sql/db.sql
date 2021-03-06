         DROP DATABASE IF EXISTS blog;
         CREATE DATABASE blog;

         -- user table
         DROP TABLE IF EXISTS blog.user;
         CREATE TABLE blog.user(
           id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'id PK',
           username VARCHAR(255) NOT NULL UNIQUE COMMENT 'username',
           password VARCHAR(255) NOT NULL COMMENT 'password',
           avatar VARCHAR(255) DEFAULT 'default.svg' COMMENT 'avatar'
         )COMMENT 'user table';

         SELECT *
         FROM blog.user;
