-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: sys
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `PROGRAM_NAME` varchar(255) NOT NULL,
  `DESCRIPTION` text,
  `CATEGORY_ID` int NOT NULL,
  `CREATE_TIME` datetime DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_TIME` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `IMG` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `CATEGORY_ID` (`CATEGORY_ID`),
  CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (7,'Chương Trình \"Nuôi Em - Hỗ Trợ Trẻ Em Châu Phi\"','Chúng ta có thể thay đổi tương lai của những trẻ em kém may mắn ở Châu Phi bằng những hành động đầy yêu thương. Chương trình \"Nuôi Em\" ra đời với mục tiêu mang lại cơ hội sống khỏe mạnh, an toàn và đầy đủ cho trẻ em ở những vùng nghèo khó, nơi mà thực phẩm, giáo dục và cơ hội phát triển vẫn còn là điều xa vời đối với nhiều em.  Với sự giúp đỡ từ cộng đồng, chúng tôi cam kết cung cấp những bữa ăn dinh dưỡng, hỗ trợ sức khỏe, cũng như những cơ hội giáo dục cho trẻ em Châu Phi. Mỗi đóng góp từ bạn sẽ giúp một đứa trẻ có được bữa ăn no đủ, những giấc ngủ an lành và sự khởi đầu mới trong cuộc sống.  Chúng tôi tin rằng mỗi hành động từ bạn sẽ không chỉ giúp những trẻ em này vượt qua khó khăn mà còn mở ra một tương lai tươi sáng hơn. Hãy cùng chúng tôi xây dựng một thế giới nơi mỗi đứa trẻ, dù ở đâu, đều có thể lớn lên khỏe mạnh và hạnh phúc.',1,'2025-01-01 18:37:56','2025-01-06 13:56:34','6.jpg'),(8,'Chương Trình \"Chia Sẻ Yêu Thương - Tặng Quần Áo, Đồ Ăn Cho Trẻ Em Khó Khăn\"','Chúng ta có thể thay đổi cuộc sống của những đứa trẻ nghèo khó chỉ bằng những hành động nhỏ nhưng đầy ý nghĩa. Chương trình \"Chia Sẻ Yêu Thương\" là một sáng kiến với mục tiêu mang lại những bộ quần áo ấm áp và những bữa ăn đầy đủ dinh dưỡng cho trẻ em có hoàn cảnh khó khăn.  Với tấm lòng sẻ chia, chúng ta sẽ trao đi những món quà thiết thực giúp các em vượt qua những thử thách trong cuộc sống. Những chiếc áo mới, đôi giày sạch sẽ và những bữa ăn ấm lòng sẽ giúp trẻ em cảm thấy an toàn, được chăm sóc và tiếp thêm động lực để học hỏi, phát triển.  Chúng tôi tin rằng mỗi đóng góp của bạn sẽ là một nguồn động viên vô giá, giúp trẻ em có cơ hội sống khỏe mạnh và hạnh phúc hơn. Hãy cùng chúng tôi lan tỏa yêu thương và tạo ra sự thay đổi tích cực cho thế hệ tương lai!',4,'2025-01-03 04:48:08','2025-01-05 02:45:34','4.jpg'),(9,'Chương Trình Dạy Học Cho Trẻ Em Vùng Cao','Chương trình dạy học cho trẻ em vùng cao là một sáng kiến ý nghĩa nhằm mang lại cơ hội tiếp cận tri thức và phát triển toàn diện cho các em nhỏ tại những khu vực khó khăn, nơi điều kiện giáo dục còn nhiều hạn chế. Chương trình tập trung vào việc xây dựng môi trường học tập thân thiện, sáng tạo và giàu tính tương tác.',1,'2025-01-05 15:38:16','2025-01-05 15:38:16','9.jpg');
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-06 21:33:00
