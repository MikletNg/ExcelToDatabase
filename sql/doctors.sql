CREATE TABLE `doctors` (
	`id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
    `specialty_map` VARCHAR(255),
    `specialty` VARCHAR(255),
    `cn_specialty` VARCHAR(255),
	`slug` VARCHAR(255) NOT NULL,
	`name` VARCHAR(255) NOT NULL,
	`cn_name` VARCHAR(255) NOT NULL,
	`links` TEXT,
	`gender` CHAR(1),
	`hospitals` VARCHAR(1000),
	`cn_hospitals` VARCHAR(1000),
	`qualifications` VARCHAR(1000),
	`cn_qualifications` VARCHAR(1000),
	`address` VARCHAR(1000),
	`district` VARCHAR(255),
    `cn_district` VARCHAR(255),
	`type_of_practise` VARCHAR(255),
    `cn_type_of_practise` VARCHAR(255),
	`open_hours` TEXT,
	`a&e_service` BOOLEAN,
	`fee` VARCHAR(255),
	`language` VARCHAR(255),
    `cn_language` VARCHAR(255),
	`service_avalible` VARCHAR(1000),
    `cn_service_avalible` VARCHAR(1000),
	`service_outside` VARCHAR(1000),
    `cn_service_outside` VARCHAR(1000),
	`med_proc_ops` TEXT,
	`phone` CHAR(50),
	`fax` CHAR(50),
	`pager` CHAR(50),
	`email` VARCHAR(255),
	PRIMARY KEY (`id`),
	FULLTEXT (`slug`,`name`, `cn_name`)
);