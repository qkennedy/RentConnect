--I need to think about how I want this to work.
-- we may want to test insertion/deletion from the db.
-- add a user
INSERT INTO `rentconnect`.`user`
(`id`,
`username`,
`password`,
`email`,
`cell_number`,
`role`)
VALUES
(1,
'cam',
'hashmepls',
'cam@case.edu',
'1234567890',
1);

--add a landlord user
INSERT INTO `rentconnect`.`user`
(`id`,
`username`,
`password`,
`email`,
`cell_number`,
`role`)
VALUES
(null,
'landlord10',
'pass',
'landlordemail@gmail.com',
2223334444,
2);

-- add a property
INSERT INTO `rentconnect`.`property`
(`id`,
`landlord_id`,
`address`,
`rent`,
`late_fee`)
VALUES
(null,
2,
'42 Wallaby Way',
900,
25);

--add tenant to property

INSERT INTO `rentconnect`.`tenants`
(`id`,
`tenant_id`,
`property_id`)
VALUES
(null,
1,
1);
