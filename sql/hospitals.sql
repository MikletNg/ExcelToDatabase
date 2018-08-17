CREATE TABLE `hospitals` (
`id` INT(6) unsigned NOT NULL AUTO_INCREMENT,
`slug` VARCHAR(255) NOT NULL,
`name` VARCHAR(255) NOT NULL,
`cn_name` VARCHAR(255) NOT NULL,
`a&e_service` BOOLEAN,
`address` VARCHAR(255) NOT NULL,
`cn_address` VARCHAR(255) NOT NULL,
`cluster` VARCHAR(255) NOT NULL,
`cn_cluster` VARCHAR(255) NOT NULL,
PRIMARY KEY (`id`),
FULLTEXT (`slug`,`name`,`cn_name`)
);