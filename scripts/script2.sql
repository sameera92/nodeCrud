DROP TABLE `web_users`;

CREATE TABLE `web_users` (
  `code` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC));


UPDATE `PSAVoting`.`contestant` SET `image`='01-Amara-Indumathi-Karunathilaka.jpg' WHERE `id`='1';
UPDATE `PSAVoting`.`contestant` SET `image`='02-Anusha-Kodithuwakku.jpg' WHERE `id`='2';
UPDATE `PSAVoting`.`contestant` SET `image`='03-Chamari-Athapaththu.jpg' WHERE `id`='3';
UPDATE `PSAVoting`.`contestant` SET `image`='04-Chathurangi-Jayasooriya.jpg' WHERE `id`='4';
UPDATE `PSAVoting`.`contestant` SET `image`='05-Dinusha-Gomez.jpg' WHERE `id`='5';
UPDATE `PSAVoting`.`contestant` SET `image`='06-Nimali-Liyanarachchi.jpg' WHERE `id`='6';
UPDATE `PSAVoting`.`contestant` SET `image`='07-Shashikala-Siriwardena.jpg' WHERE `id`='7';
UPDATE `PSAVoting`.`contestant` SET `image`='08-Tharjani-Shivalingam.jpg' WHERE `id`='8';
UPDATE `PSAVoting`.`contestant` SET `image`='09-DM-Indika-Dissanayaka.jpg' WHERE `id`='9';
UPDATE `PSAVoting`.`contestant` SET `image`='10-Dilantha-Malagamuwa.jpg' WHERE `id`='10';
UPDATE `PSAVoting`.`contestant` SET `image`='11-Dinesh-Priyantha.jpg' WHERE `id`='11';
UPDATE `PSAVoting`.`contestant` SET `image`='12-Fazil-Marija.jpg' WHERE `id`='12';
UPDATE `PSAVoting`.`contestant` SET `image`='13-Ishan-Sanjeewa-Bandara.jpg' WHERE `id`='13';
UPDATE `PSAVoting`.`contestant` SET `image`='14-J.jpg' WHERE `id`='14';
UPDATE `PSAVoting`.`contestant` SET `image`='15-Lasith-Malinga.jpg' WHERE `id`='15';
UPDATE `PSAVoting`.`contestant` SET `image`='16-Amasha-De-Silva.jpg' WHERE `id`='16';
UPDATE `PSAVoting`.`contestant` SET `image`='17-Gihansa-Jayweera.jpg' WHERE `id`='17';
UPDATE `PSAVoting`.`contestant` SET `image`='18-Hasini-Ambalangoda.jpg' WHERE `id`='18';
UPDATE `PSAVoting`.`contestant` SET `image`='19-Parami-Wasanthi-Maristela.jpg' WHERE `id`='19';
UPDATE `PSAVoting`.`contestant` SET `image`='20-Rashmi-Taniya-Perera.jpg' WHERE `id`='20';
UPDATE `PSAVoting`.`contestant` SET `image`='21-Shelinda-Jansen.jpg' WHERE `id`='21';
UPDATE `PSAVoting`.`contestant` SET `image`='22-Akalanka-Peiris.jpg' WHERE `id`='22';
UPDATE `PSAVoting`.`contestant` SET `image`='23-Harshana-Thilakarathna.jpg' WHERE `id`='23';
UPDATE `PSAVoting`.`contestant` SET `image`='24-Hasitha-Boyagoda.jpg' WHERE `id`='24';
UPDATE `PSAVoting`.`contestant` SET `image`='25-Kail-Abeysinghe.jpg' WHERE `id`='25';
UPDATE `PSAVoting`.`contestant` SET `image`='26-A-Aruna-Darshana.jpg' WHERE `id`='26';
UPDATE `PSAVoting`.`contestant` SET `image`='27-Senura-Amarasinghe.jpg' WHERE `id`='27';

CREATE TABLE `PSAVoting`.`admin_users` (
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`username`));


