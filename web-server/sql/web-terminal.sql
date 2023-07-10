-- 1. 创建数据库
CREATE DATABASE IF NOT EXISTS `web_terminal` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

-- 2. 使用数据库
USE `web_terminal`;

-- 3. 创建表
CREATE TABLE IF NOT EXISTS `user` (
  `name` varchar(255) NOT NULL COMMENT '用户名',
`password` varchar(255) NOT NULL COMMENT '密码',
    `email` VARCHAR(255) NOT NULL COMMENT '邮箱'
);