-- Prepares a MySQL server for the project.
CREATE DATABASE IF NOT EXISTS tumbler_api;
CREATE USER IF NOT EXISTS 'tumbler'@'%' IDENTIFIED BY '';
GRANT ALL PRIVILEGES ON tumbler_api . * TO 'tumbler'@'%';
