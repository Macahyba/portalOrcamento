-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: orcamentosdb
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clientes` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `nomeCliente` varchar(255) NOT NULL,
  `cnpj` varchar(16) NOT NULL,
  `responsavel` varchar(255) NOT NULL,
  `departamento` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nomeCliente` (`nomeCliente`,`cnpj`,`responsavel`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (22,'TVG','cnpjtvg','MARIO','Engenharia TVG'),(23,'TVR','cnpjtvr','JOAO','Engenharia TVR'),(25,'EMISSORA','CNPJEMISSORA','MARIA','Engenharia EMISSORA'),(26,'XPTO','NPMJ','JOSE','Engenharia XPTO'),(27,'TVG','CNPJTVG','ANTONIO','Engenharia TVG'),(28,'EMISSORA','CNPJEMISSORA','ANTONIO','Suporte EMISSORA'),(31,'RECORD RJ','01024.2325/1000','ALTAIR','Engenharia RECORD RJ'),(32,'TVG','CNPJTVG','TGHGGH','ENGENHARIA TVG'),(33,'TV GLOBO RJ','CNPJDATVGLOBORJ','WILSON','ENGENHARIA TVG'),(34,'TVG SP','CPFSP','MARIO','ENG');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipamentos`
--

DROP TABLE IF EXISTS `equipamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `equipamentos` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `nomeEquip` varchar(255) NOT NULL,
  `serialNumber` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`nomeEquip`,`serialNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamentos`
--

LOCK TABLES `equipamentos` WRITE;
/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
INSERT INTO `equipamentos` VALUES (42,'AA','488484'),(39,'AA','5'),(45,'AAA','355'),(52,'AAA','JKJK'),(37,'ODS','1'),(40,'ODS','10'),(41,'ODS','1232'),(49,'ODS','124'),(38,'ODS','2'),(57,'ODS','6565'),(51,'ODS-L30','124'),(44,'PDW','1520'),(48,'PDW','5000'),(47,'PDW','520'),(46,'PDW','555'),(56,'PDWF75','25471'),(43,'PMW','258'),(53,'PMW-F55','123456'),(54,'PMWF65','123456'),(55,'PMWF65','1234567');
/*!40000 ALTER TABLE `equipamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orcamentos`
--

DROP TABLE IF EXISTS `orcamentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orcamentos` (
  `id` bigint(20) NOT NULL,
  `idUsuario` int(16) NOT NULL,
  `idEquip` int(16) NOT NULL,
  `idCliente` int(16) NOT NULL,
  `valor` float NOT NULL,
  `status` varchar(16) NOT NULL,
  `dataCriacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `dataAprov` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idEquip` (`idEquip`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `orcamentos_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `users` (`id`),
  CONSTRAINT `orcamentos_ibfk_2` FOREIGN KEY (`idEquip`) REFERENCES `equipamentos` (`id`),
  CONSTRAINT `orcamentos_ibfk_3` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orcamentos`
--

LOCK TABLES `orcamentos` WRITE;
/*!40000 ALTER TABLE `orcamentos` DISABLE KEYS */;
INSERT INTO `orcamentos` VALUES (201808022000,1,37,22,10,'NOVO','2018-08-25 18:56:04',NULL),(201808022001,1,38,22,20,'NOVO','2018-08-25 18:56:17',NULL),(201808023000,1,39,23,90,'NOVO','2018-08-25 18:56:31',NULL),(201809022002,32,43,22,11111,'NOVO','2018-09-16 02:40:06',NULL),(201809022003,33,44,22,111,'NOVO','2018-09-16 15:03:51',NULL),(201809022004,33,44,22,111,'NOVO','2018-09-16 15:04:10',NULL),(201809022005,32,43,22,111,'NOVO','2018-09-16 15:05:35',NULL),(201809022006,32,49,22,1111,'NOVO','2018-09-16 15:05:45',NULL),(201809023001,33,53,23,111,'NOVO','2018-09-16 15:08:03',NULL),(201809025000,1,41,25,666,'NOVO','2018-09-01 19:05:03',NULL),(201809025001,1,42,25,8000,'NOVO','2018-09-01 19:05:58',NULL),(201809025002,1,43,25,500,'NOVO','2018-09-01 19:15:00',NULL),(201809025003,1,44,25,330,'NOVO','2018-09-01 21:32:41',NULL),(201809025004,1,42,25,111,'NOVO','2018-09-15 22:14:58',NULL),(201809025005,1,42,25,33333,'NOVO','2018-09-15 22:16:22',NULL),(201809025006,3,45,25,111,'NOVO','2018-09-16 02:37:21',NULL),(201809025007,3,42,25,111,'NOVO','2018-09-16 02:37:59',NULL),(201809025008,32,41,25,6,'NOVO','2018-09-16 02:41:28',NULL),(201809025009,32,41,25,111,'NOVO','2018-09-16 15:05:26',NULL),(201809026000,1,45,26,222,'NOVO','2018-09-01 21:33:06',NULL),(201809026001,1,46,26,5454,'NOVO','2018-09-01 21:34:20',NULL),(201809026002,34,55,26,2232320,'NOVO','2018-09-17 22:21:32',NULL),(201809027000,1,47,27,1000,'NOVO','2018-09-01 22:16:19',NULL),(201809028000,1,48,28,1000,'NOVO','2018-09-01 23:15:37',NULL),(201809028001,1,49,28,3333,'NOVO','2018-09-01 23:16:01',NULL),(201809031000,1,51,31,500,'NOVO','2018-09-02 02:15:52',NULL),(201809031001,33,53,31,111,'NOVO','2018-09-16 15:04:27',NULL),(201809031002,3,57,31,5000,'NOVO','2018-09-17 23:52:53',NULL),(201809032000,1,52,32,22454500,'NOVO','2018-09-11 21:39:04',NULL),(201809033000,1,53,33,5000,'NOVO','2018-09-11 22:11:50',NULL),(201809033001,1,54,33,6000,'NOVO','2018-09-11 22:17:46',NULL),(201809034000,34,56,34,2000,'NOVO','2018-09-17 22:23:22',NULL);
/*!40000 ALTER TABLE `orcamentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `nomeUsuario` varchar(255) NOT NULL,
  `email` varchar(32) NOT NULL,
  `perfil` varchar(16) NOT NULL,
  `password` char(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nomeUsuario` (`nomeUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Thiago','t.macahyba@gmail.com','manager','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(2,'Andre','','usuario','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(3,'Maca','maca@maca.com','manager','$2b$11$9u5fpGjEhu9hNcCe4wXOaOg9WYAL8Beusu68qFdRbF2KvNMeoB7xK'),(22,'Jose','jose','usuario','$2b$11$mCSBQ/yTBVpFL5wd6VdH4e/KOyn8hJaPKC.hvt86fsxQ/Jarozykq'),(32,'joao','joao','manager','$2b$11$X60Wi5REoxBVwvMNW/OPBeQ2iENNdAHGu5jvnsu7f.NQAUaZ5oWBu'),(33,'ricardo','ricardo@ricardo.com','usuario','$2b$11$lnPK6wgMI4K4aL3S2pggOeDfH3VYHSH3YBhQCqjKdWL7A87RgnVVu'),(34,'teste','teste','usuario','$2b$11$c5MP7pzdrDp4fxvTR3Y.2.HDt7MbUTBUa7eNcCb1ZHeA1HlP99Icm');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-18  0:55:04
