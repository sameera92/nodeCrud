-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: PSAVoting
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'The Most Popular Sportswoman of the year'),(2,'The Most Popular Sportsman of the year'),(3,'The Most Popular Upcoming Sportswoman of the year'),(4,'The Most Popular  Upcoming Sportsman of the year');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contestant`
--

DROP TABLE IF EXISTS `contestant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contestant` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `sport` varchar(100) NOT NULL,
  `category_id` int(11) NOT NULL,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contestant`
--

LOCK TABLES `contestant` WRITE;
/*!40000 ALTER TABLE `contestant` DISABLE KEYS */;
INSERT INTO `contestant` VALUES (1,'Amara Indumathi Karunathilaka','Athletic - Para',1,NULL),(2,'Anusha Kodithuwakku','Boxing',1,NULL),(3,'Chamari Athapaththu','Cricket',1,NULL),(4,'Chathurangi Jayasooriya','Netball',1,NULL),(5,'Dinusha Gomez','Weight Lifting',1,NULL),(6,'Nimali Liyanarachchi','AThletic',1,NULL),(7,'Shashikala Siriwardena','Cricket',1,NULL),(8,'Tharjani Shivalingam','Netball',1,NULL),(9,'DM Indika Dissanayaka','Weight Lifting',2,NULL),(10,'Dilantha Malagamuwa','Motor racing',2,NULL),(11,'Dinesh Priyantha','Athletic - Para',2,NULL),(12,'Fazil Marija','Rugby Football',2,NULL),(13,'Ishan Sanjeewa Bandara','Boxing',2,NULL),(14,'J.A Chathuranga Lakamal','Weight Lifting',2,NULL),(15,'Lasith Malinga','Cricket',2,NULL),(16,'Amasha De Silva','Athletic',3,NULL),(17,'Gihansa Jayweera','Chess',3,NULL),(18,'Hasini Ambalangoda','Badminton',3,NULL),(19,'Parami Wasanthi Maristela','Athletic',3,NULL),(20,'Rashmi Taniya Perera','Basketball',3,NULL),(21,'Shelinda Jansen','Athletic',3,NULL),(22,'Akalanka Peiris','Swimming',4,NULL),(23,'Harshana Thilakarathna','Chess',4,NULL),(24,'Hasitha Boyagoda','Cricket',4,NULL),(25,'Kyle Abeysinghe','Swimming',4,NULL),(26,'A Aruna Darshana','Athletic',4,NULL),(27,'Senura Amarasinghe','Athletic',4,NULL);
/*!40000 ALTER TABLE `contestant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reply_messages`
--

DROP TABLE IF EXISTS `reply_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reply_messages` (
  `key` varchar(45) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reply_messages`
--

LOCK TABLES `reply_messages` WRITE;
/*!40000 ALTER TABLE `reply_messages` DISABLE KEYS */;
INSERT INTO `reply_messages` VALUES ('ALREADY_EXISTS','Sorry you have voted one person in this category. Please vote for a different category.  From Presidential Sports Awards'),('DB_ERROR','Please try again later From Presidential Sports Awards'),('INVALID_CONTESTANT_ID','Incorrect Voting Number. Please check the Voting number and send again. From Presidential Sports Awards'),('INVALID_SHORT_CODE','Incorrect Key Word. Please check the Key Word and send again. From Presidential Sports Awards'),('SUCCESS','Thank you for your Vote. Please stay in touch with us for the results. From Presidential Sports Awards');
/*!40000 ALTER TABLE `reply_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_log`
--

DROP TABLE IF EXISTS `sms_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` datetime NOT NULL,
  `mobile_number` varchar(45) DEFAULT NULL,
  `message` varchar(100) DEFAULT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_log`
--

LOCK TABLES `sms_log` WRITE;
/*!40000 ALTER TABLE `sms_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sms_vote`
--

DROP TABLE IF EXISTS `sms_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sms_vote` (
  `mobile_number` varchar(45) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `contest_id` int(11) NOT NULL,
  `date_time` varchar(45) NOT NULL,
  PRIMARY KEY (`mobile_number`,`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sms_vote`
--

LOCK TABLES `sms_vote` WRITE;
/*!40000 ALTER TABLE `sms_vote` DISABLE KEYS */;
/*!40000 ALTER TABLE `sms_vote` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_suggest`
--

DROP TABLE IF EXISTS `web_suggest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_suggest` (
  `id` int(11) NOT NULL,
  `code` varchar(45) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL,
  `value` varchar(100) DEFAULT NULL,
  `date_time` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_suggest`
--

LOCK TABLES `web_suggest` WRITE;
/*!40000 ALTER TABLE `web_suggest` DISABLE KEYS */;
/*!40000 ALTER TABLE `web_suggest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_users`
--

DROP TABLE IF EXISTS `web_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_users`
--

LOCK TABLES `web_users` WRITE;
/*!40000 ALTER TABLE `web_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `web_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `web_vote`
--

DROP TABLE IF EXISTS `web_vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `web_vote` (
  `code` varchar(45) NOT NULL,
  `cat_id` int(11) NOT NULL,
  `contest_id` int(11) NOT NULL,
  `date_time` varchar(45) NOT NULL,
  PRIMARY KEY (`code`,`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `web_vote`
--

LOCK TABLES `web_vote` WRITE;
/*!40000 ALTER TABLE `web_vote` DISABLE KEYS */;
/*!40000 ALTER TABLE `web_vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-10 17:58:13