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
  PRIMARY KEY (`id`),
  UNIQUE KEY `nomeCliente` (`nomeCliente`),
  UNIQUE KEY `cnpj` (`cnpj`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'TV Globo RJ','cnpjglobo'),(2,'Globosat','cnpjglobosat'),(68,'q','q'),(69,'a','a'),(70,'s','s'),(71,'1','1'),(73,'2','2'),(74,'4','4'),(75,'5','5'),(76,'6','6'),(77,'7','7'),(78,'8','8'),(79,'9','9'),(80,'z','z'),(82,'b','b'),(83,'g','g');
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
  `serialNumber` varchar(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_index` (`nomeEquip`,`serialNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamentos`
--

LOCK TABLES `equipamentos` WRITE;
/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
INSERT INTO `equipamentos` VALUES (73,'1','1'),(90,'123','123'),(75,'2','2'),(76,'4','4'),(77,'5','5'),(78,'6','6'),(79,'7','7'),(80,'8','8'),(81,'9','9'),(82,'a','1'),(71,'a','2'),(85,'b','223'),(91,'bgt','0'),(88,'g','667'),(86,'mmm','009'),(1,'ODS-L30M','123456'),(2,'PMW-200','456789'),(3,'PMW-200','987654'),(70,'q','1'),(72,'s','4'),(89,'tt','564'),(83,'z','222');
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
INSERT INTO `orcamentos` VALUES (1,1,1,1,1000,'novo','2018-08-20 22:24:53'),(2,2,2,2,2000,'novo','2018-08-20 22:27:00'),(3,1,2,1,3000,'encerrado','2018-08-20 22:51:06'),(4,1,1,1,3000,'novo','2018-08-21 13:26:13'),(5,1,1,1,7000,'novo','2018-08-21 17:33:53'),(6,1,2,2,10000,'novo','2018-08-21 17:35:33'),(201808001125,1,1,1,1000,'novo','2018-08-23 19:20:13'),(201808071001,1,73,71,1,'novo','2018-08-24 00:53:37'),(201808073001,1,75,73,2,'novo','2018-08-24 00:53:44'),(201808074001,1,76,74,4,'novo','2018-08-24 00:55:52'),(201808075001,1,77,75,5,'novo','2018-08-24 00:56:16'),(201808076001,1,78,76,6,'novo','2018-08-24 00:59:56'),(201808082001,1,85,82,1,'novo','2018-08-24 01:35:36'),(201808083001,1,88,83,900,'novo','2018-08-24 01:41:10');
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
  `perfil` varchar(16) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Thiago','manager'),(2,'Andre','usuario');
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

-- Dump completed on 2018-08-24  1:55:03
