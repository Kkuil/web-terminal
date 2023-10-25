-- 1. 创建数据库
CREATE DATABASE IF NOT EXISTS `db_web-terminal` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

-- 2. 使用数据库
USE `db_web-terminal`;

-- 3. 创建表
CREATE TABLE IF NOT EXISTS `user`
(
    `id`       varchar(255) NOT NULL COMMENT 'id',
    `name`     varchar(255) NOT NULL COMMENT '用户名',
    `password` varchar(255) NOT NULL COMMENT '密码'
);