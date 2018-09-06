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
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (22,'TVG','cnpjtvg','MARIO','Engenharia TVG'),(23,'TVR','cnpjtvr','JOAO','Engenharia TVR'),(25,'EMISSORA','CNPJEMISSORA','MARIA','Engenharia EMISSORA'),(26,'XPTO','NPMJ','JOSE','Engenharia XPTO'),(27,'TVG','CNPJTVG','ANTONIO','Engenharia TVG'),(28,'EMISSORA','CNPJEMISSORA','ANTONIO','Engenharia EMISSORA'),(31,'RECORD RJ','01024.2325/1000','ALTAIR','Engenharia RECORD RJ');
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
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipamentos`
--

LOCK TABLES `equipamentos` WRITE;
/*!40000 ALTER TABLE `equipamentos` DISABLE KEYS */;
INSERT INTO `equipamentos` VALUES (50,'',''),(42,'AA','488484'),(39,'AA','5'),(45,'AAA','355'),(37,'ODS','1'),(40,'ODS','10'),(41,'ODS','1232'),(49,'ODS','124'),(38,'ODS','2'),(51,'ODS-L30','124'),(44,'PDW','1520'),(48,'PDW','5000'),(47,'PDW','520'),(46,'PDW','555'),(43,'PMW','258');
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
INSERT INTO `orcamentos` VALUES (201808022000,1,37,22,10,'novo','2018-08-25 18:56:04'),(201808022001,1,38,22,20,'novo','2018-08-25 18:56:17'),(201808023000,1,39,23,90,'novo','2018-08-25 18:56:31'),(201809025000,1,41,25,666,'novo','2018-09-01 19:05:03'),(201809025001,1,42,25,8000,'novo','2018-09-01 19:05:58'),(201809025002,1,43,25,500,'novo','2018-09-01 19:15:00'),(201809025003,1,44,25,330,'novo','2018-09-01 21:32:41'),(201809026000,1,45,26,222,'novo','2018-09-01 21:33:06'),(201809026001,1,46,26,5454,'novo','2018-09-01 21:34:20'),(201809027000,1,47,27,1000,'novo','2018-09-01 22:16:19'),(201809028000,1,48,28,1000,'novo','2018-09-01 23:15:37'),(201809028001,1,49,28,3333,'novo','2018-09-01 23:16:01'),(201809031000,1,51,31,500,'novo','2018-09-02 02:15:52');
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

-- Dump completed on 2018-09-05 23:52:18
