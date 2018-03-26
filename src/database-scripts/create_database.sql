
CREATE DATABASE RentConnect;

-- Create User Table

CREATE TABLE `rentconnect`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(32) NOT NULL,
  `password` CHAR(64) NOT NULL,
  `email` VARCHAR(64) NULL,
  `cell_number` VARCHAR(16) NULL,
  `role` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));
