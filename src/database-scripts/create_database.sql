
CREATE DATABASE RentConnect;

-- Create User Table
--TODO add actual name as a col
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

-- Create property
  CREATE TABLE `rentconnect`.`property` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `landlord_id` INT NOT NULL,
    `address` VARCHAR(45) NULL,
    `rent` DOUBLE NULL,
    `late_fee` DOUBLE NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC));


    ALTER TABLE `rentconnect`.`property`
    ADD COLUMN `due_date` INT(11) NULL AFTER `late_fee`;

-- Create tenants table, it maps properties to tenants
--I should reorder this, but I'm not gonna.
CREATE TABLE `rentconnect`.`tenants` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `tenant_id` INT NULL,
  `property_id` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `property_id`
    FOREIGN KEY (`property_id`)
    REFERENCES `rentconnect`.`property` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Create applications TABLE
CREATE TABLE `rentconnect`.`application` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `property_id` INT NOT NULL,
  `applicant_id` INT NOT NULL,
  `status` VARCHAR(45) NULL,
  `application_data` BLOB NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

-- Create document TABLE
CREATE TABLE `rentconnect`.`document` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `property_id` INT NOT NULL,
  `created_date` DATE NOT NULL,
  `creator_id` INT NOT NULL,
  `title` VARCHAR(64) NULL,
  `file` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));

-- Create Maintenance Request table
  CREATE TABLE `rentconnect`.`maint_request` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `property_id` INT NULL,
    `creator_id` INT NULL,
    `created_date` DATE NULL,
    `title` VARCHAR(128) NULL,
    `description` VARCHAR(256) NULL,
    `attached_files` VARCHAR(256) NULL,
    `worker_id` INT NULL,
    `status` INT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC));
-- Create comment table
    CREATE TABLE `rentconnect`.`comment` (
      `id` INT NOT NULL AUTO_INCREMENT,
      `request_id` INT NOT NULL,
      `creator_id` INT NOT NULL,
      `created_date` DATE NOT NULL,
      `comment_text` VARCHAR(512) NULL,
      `attached_files` VARCHAR(256) NULL,
      PRIMARY KEY (`id`),
      UNIQUE INDEX `id_UNIQUE` (`id` ASC));

--Create Rent History table
CREATE TABLE `rentconnect`.`rent_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `payer_id` INT NOT NULL,
  `property_id` INT NOT NULL,
  `payment_date` DATE NOT NULL,
  `payment_amount` FLOAT NULL,
  `on_time` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));
