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
