-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 18, 2025 lúc 04:42 AM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `news`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `NAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DESCRIPTION` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ORDER` int(11) NOT NULL,
  `ISACTIVE` int(11) NOT NULL,
  `WEBSITE` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT current_timestamp(),
  `UPDATE_TIME` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`ID`, `NAME`, `DESCRIPTION`, `ORDER`, `ISACTIVE`, `WEBSITE`, `CREATE_TIME`, `UPDATE_TIME`) VALUES
(1, 'Thể thao', 'Về các sự kiện thể thao trong và ngoài nước', 1, 1, 'https://www.saigonchildren.com/vi/', '2023-12-23 14:30:00', '2025-01-06 00:44:22'),
(4, 'Sức khỏe', 'Về đời sống sức khỏe hàng ngày', 2, 1, 'https://www.who.int/', '2025-01-01 19:49:06', '2025-01-06 00:44:37'),
(7, 'Pháp luật', 'Về các thông tư, hiến pháp mới được phát hành', 3, 0, 'https://nguoikhuyettathcm.org/', '2025-01-06 00:48:05', '2025-01-06 00:48:05'),
(8, 'Du lịch', 'Về những nơi nên tới hehe', 4, 1, 'https://vnexpress.net/du-lich', '2025-11-16 16:14:54', '2025-11-16 16:15:42'),
(9, 'Du lịch phủi', 'Về những nơi nên tới', 5, 0, 'https://vnexpress.net/du-lich', '2025-11-17 01:51:36', '2025-11-17 01:51:36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `causes`
--

CREATE TABLE `causes` (
  `ID` int(11) NOT NULL,
  `USER_NAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PROGRAM_ID` int(11) NOT NULL,
  `RATING` int(11) NOT NULL,
  `DESCRIPTION` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT current_timestamp(),
  `UPDATE_TIME` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `causes`
--

INSERT INTO `causes` (`ID`, `USER_NAME`, `PROGRAM_ID`, `RATING`, `DESCRIPTION`, `CREATE_TIME`, `UPDATE_TIME`) VALUES
(1, 'Vũ', 7, 5, 'good', '2025-01-02 06:44:38', '2025-01-06 00:14:57'),
(4, 'Huy', 7, 4, 'good', '2025-01-06 00:15:52', '2025-01-06 00:15:52'),
(5, 'Luyện', 7, 1, 'good', '2025-01-06 00:18:39', '2025-01-06 00:18:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `programs`
--

CREATE TABLE `programs` (
  `ID` int(11) NOT NULL,
  `PROGRAM_NAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DESCRIPTION` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CATEGORY_ID` int(11) NOT NULL,
  `CREATE_TIME` datetime DEFAULT current_timestamp(),
  `UPDATE_TIME` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `IMG` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `programs`
--

INSERT INTO `programs` (`ID`, `PROGRAM_NAME`, `DESCRIPTION`, `CATEGORY_ID`, `CREATE_TIME`, `UPDATE_TIME`, `IMG`) VALUES
(7, 'Chương Trình \"Nuôi Em - Hỗ Trợ Trẻ Em Châu Phi\"', 'Chúng ta có thể thay đổi tương lai của những trẻ em kém may mắn ở Châu Phi bằng những hành động đầy yêu thương. Chương trình \"Nuôi Em\" ra đời với mục tiêu mang lại cơ hội sống khỏe mạnh, an toàn và đầy đủ cho trẻ em ở những vùng nghèo khó, nơi mà thực phẩm, giáo dục và cơ hội phát triển vẫn còn là điều xa vời đối với nhiều em.  Với sự giúp đỡ từ cộng đồng, chúng tôi cam kết cung cấp những bữa ăn dinh dưỡng, hỗ trợ sức khỏe, cũng như những cơ hội giáo dục cho trẻ em Châu Phi. Mỗi đóng góp từ bạn sẽ giúp một đứa trẻ có được bữa ăn no đủ, những giấc ngủ an lành và sự khởi đầu mới trong cuộc sống.  Chúng tôi tin rằng mỗi hành động từ bạn sẽ không chỉ giúp những trẻ em này vượt qua khó khăn mà còn mở ra một tương lai tươi sáng hơn. Hãy cùng chúng tôi xây dựng một thế giới nơi mỗi đứa trẻ, dù ở đâu, đều có thể lớn lên khỏe mạnh và hạnh phúc.', 1, '2025-01-01 18:37:56', '2025-01-06 13:56:34', '6.jpg'),
(8, 'Chương Trình \"Chia Sẻ Yêu Thương - Tặng Quần Áo, Đồ Ăn Cho Trẻ Em Khó Khăn\"', 'Chúng ta có thể thay đổi cuộc sống của những đứa trẻ nghèo khó chỉ bằng những hành động nhỏ nhưng đầy ý nghĩa. Chương trình \"Chia Sẻ Yêu Thương\" là một sáng kiến với mục tiêu mang lại những bộ quần áo ấm áp và những bữa ăn đầy đủ dinh dưỡng cho trẻ em có hoàn cảnh khó khăn.  Với tấm lòng sẻ chia, chúng ta sẽ trao đi những món quà thiết thực giúp các em vượt qua những thử thách trong cuộc sống. Những chiếc áo mới, đôi giày sạch sẽ và những bữa ăn ấm lòng sẽ giúp trẻ em cảm thấy an toàn, được chăm sóc và tiếp thêm động lực để học hỏi, phát triển.  Chúng tôi tin rằng mỗi đóng góp của bạn sẽ là một nguồn động viên vô giá, giúp trẻ em có cơ hội sống khỏe mạnh và hạnh phúc hơn. Hãy cùng chúng tôi lan tỏa yêu thương và tạo ra sự thay đổi tích cực cho thế hệ tương lai!', 4, '2025-01-03 04:48:08', '2025-01-05 02:45:34', '4.jpg'),
(9, 'Chương Trình Dạy Học Cho Trẻ Em Vùng Cao', 'Chương trình dạy học cho trẻ em vùng cao là một sáng kiến ý nghĩa nhằm mang lại cơ hội tiếp cận tri thức và phát triển toàn diện cho các em nhỏ tại những khu vực khó khăn, nơi điều kiện giáo dục còn nhiều hạn chế. Chương trình tập trung vào việc xây dựng môi trường học tập thân thiện, sáng tạo và giàu tính tương tác.', 1, '2025-01-05 15:38:16', '2025-01-05 15:38:16', '9.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `FULL_NAME` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `EMAIL` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PASSWORD` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ROLE` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `STATUS` varchar(2) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CREATE_TIME` datetime DEFAULT current_timestamp(),
  `UPDATE_TIME` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `USER_NAME` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`ID`, `FULL_NAME`, `EMAIL`, `PASSWORD`, `ROLE`, `STATUS`, `CREATE_TIME`, `UPDATE_TIME`, `USER_NAME`) VALUES
(1, 'Nguyen Van A', 'ducvu9a1bro@gmail.com', '202cb962ac59075b964b07152d234b70', '00', '00', '2024-12-17 09:01:32', '2025-01-06 14:25:57', 'nguyenvana'),
(16, 'vu1234', 'ducvu7@gmail.com', '202cb962ac59075b964b07152d234b70', '00', '00', '2024-12-24 12:07:47', '2025-01-05 09:22:46', 'vu123345'),
(20, 'Nguyen Van A', 'vu1@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '01', '01', '2025-01-05 09:23:29', '2025-01-05 13:27:38', 'nguyenvanc'),
(24, 'Nam', 'nam@gmail.com', 'c4ca4238a0b923820dcc509a6f75849b', '00', '01', '2025-01-06 06:08:28', '2025-01-06 06:31:20', 'nam123');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Chỉ mục cho bảng `causes`
--
ALTER TABLE `causes`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PROGRAM_ID` (`PROGRAM_ID`);

--
-- Chỉ mục cho bảng `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `CATEGORY_ID` (`CATEGORY_ID`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `EMAIL` (`EMAIL`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `causes`
--
ALTER TABLE `causes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `programs`
--
ALTER TABLE `programs`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `causes`
--
ALTER TABLE `causes`
  ADD CONSTRAINT `programs_ibfk_2` FOREIGN KEY (`PROGRAM_ID`) REFERENCES `programs` (`ID`);

--
-- Các ràng buộc cho bảng `programs`
--
ALTER TABLE `programs`
  ADD CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
