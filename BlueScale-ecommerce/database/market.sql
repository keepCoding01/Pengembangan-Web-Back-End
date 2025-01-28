-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2024 at 05:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marketplace`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `note` text DEFAULT NULL,
  `is_checked` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `quantity`, `note`, `is_checked`) VALUES
(1, 1, 1, 1, 'Sangat bagus', 1),
(2, 1, 3, 1, '', 1),
(3, 2, 2, 2, 'Barang second', 0),
(4, 3, 5, 1, 'Untuk hadiah ulang tahun', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `discount_percent` int(11) DEFAULT 0,
  `image_url` text DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `store_id`, `name`, `price`, `category`, `discount_percent`, `image_url`, `description`) VALUES
(1, 1, 'Smartphone', 3000000.00, 'Elektronik', 10, 'https://tse4.mm.bing.net/th?id=OIP.4OYWnhVW-KBGlQfjk4IAfwHaEs&pid=Api&P=0&h=220', 'Smartphone dengan teknologi terbaru.'),
(2, 1, 'Laptop', 7000000.00, 'Elektronik', 15, 'https://tse3.mm.bing.net/th?id=OIP.TmdVZty6FfKab0vUeFwvaAHaEm&pid=Api&P=0&h=220', 'Laptop dengan performa tinggi.'),
(3, 1, 'Smart TV', 4000000.00, 'Elektronik', 20, 'https://tse4.mm.bing.net/th?id=OIP.0y6hys_3Ztl5XUfgTGd0gwHaHa&pid=Api&P=0&h=220', 'Smart TV dengan kualitas gambar 4K.'),
(4, 2, 'Kaos Pria', 100000.00, 'Pakaian', 10, 'https://tse1.mm.bing.net/th?id=OIP.sBC6267bWLGjMtQ3YfmbGgHaHa&pid=Api&P=0&h=220', 'Kaos pria dengan desain modern.'),
(5, 2, 'Gaun Wanita', 300000.00, 'Pakaian', 20, 'https://tse3.mm.bing.net/th?id=OIP.ZDJRIdCOZbpxisQ8luiBtQHaG_&pid=Api&P=0&h=220', 'Gaun elegan untuk acara formal.'),
(6, 2, 'Celana Jeans', 200000.00, 'Pakaian', 15, 'https://tse1.mm.bing.net/th?id=OIP.UQMnk8SWeHfGIl-9_G0uGwHaE8&pid=Api&P=0&h=220', 'Celana jeans nyaman dan stylish.'),
(7, 3, 'Mobil Mainan', 50000.00, 'Mainan', 10, 'https://tse1.mm.bing.net/th?id=OIP.e2fjPOtiHyn31pLlVe_kSAHaFj&pid=Api&P=0&h=220', 'Mobil mainan yang menyenangkan anak-anak.'),
(8, 3, 'Boneka', 75000.00, 'Mainan', 20, 'https://tse1.mm.bing.net/th?id=OIP.E2u_5U520unB-WdqMm3QhAHaLh&pid=Api&P=0&h=220', 'Boneka lucu dengan warna cerah.'),
(9, 3, 'Puzzle', 30000.00, 'Mainan', 5, 'https://tse2.mm.bing.net/th?id=OIP.KH80tB-cjfYNtitItiB1AgHaEo&pid=Api&P=0&h=220', 'Puzzle edukatif untuk anak-anak.'),
(10, 4, 'Novel', 80000.00, 'Buku', 10, 'https://tse4.mm.bing.net/th?id=OIP.5d6peCEtkxYTeGLk2rarJgHaLG&pid=Api&P=0&h=220', 'Novel dengan cerita menarik.'),
(11, 4, 'Buku Pelajaran', 100000.00, 'Buku', 5, 'https://tse2.mm.bing.net/th?id=OIP.DhB4wGeD2Ej7SqSQZueCHgHaGD&pid=Api&P=0&h=220', 'Buku pelajaran untuk sekolah.'),
(12, 4, 'Komik', 60000.00, 'Buku', 15, 'https://tse4.mm.bing.net/th?id=OIP.nodjo4FmOAcxjmubJjY48wHaFj&pid=Api&P=0&h=220', 'Komik dengan gambar dan cerita menarik.'),
(13, 5, 'Sepatu Olahraga', 400000.00, 'Olahraga', 10, 'https://tse1.mm.bing.net/th?id=OIP.4c2AoluKi7hSU_hniZxjPwHaHa&pid=Api&P=0&h=220', 'Sepatu olahraga yang nyaman digunakan.'),
(14, 5, 'Bola Basket', 250000.00, 'Olahraga', 15, 'https://tse2.mm.bing.net/th?id=OIP.ZLJBDWcPgKJMzKnZBXZO2gHaHZ&pid=Api&P=0&h=220', 'Bola basket berkualitas tinggi.'),
(15, 5, 'Kaos Olahraga', 150000.00, 'Olahraga', 20, 'https://tse4.mm.bing.net/th?id=OIP.ndjyu_F_OSq6txMEGd3DFgHaFP&pid=Api&P=0&h=220', 'Kaos olahraga nyaman untuk aktivitas fisik.'),
(16, 6, 'Mie Instan', 5000.00, 'Makanan', 10, 'https://tse3.mm.bing.net/th?id=OIP.HZ78DlCqmeCJVPmm0zqLbwHaHa&pid=Api&P=0&h=220', 'Mie instan yang lezat dan praktis.'),
(17, 6, 'Kopi Sachet', 15000.00, 'Makanan', 5, 'https://tse1.mm.bing.net/th?id=OIP.1FJ_1ORoQDpyTBFhDHNL4QHaGL&pid=Api&P=0&h=220', 'Kopi sachet dengan rasa nikmat.'),
(18, 6, 'Snack Camilan', 10000.00, 'Makanan', 20, 'https://images.unsplash.com/photo-1562608452-8c5e6ff70db3https://tse3.mm.bing.net/th?id=OIP.hHadASAcAMzrcPs5eWU36AHaFb&pid=Api&P=0&h=220', 'Camilan ringan untuk teman bersantai.'),
(19, 7, 'Teh Botol', 7000.00, 'Minuman', 10, 'https://tse1.mm.bing.net/th?id=OIP.HebpY_XO_Vz_YeCqUYLWdQHaKL&pid=Api&P=0&h=220', 'Teh botol yang segar dan manis.'),
(20, 7, 'Air Mineral', 5000.00, 'Minuman', 5, 'https://tse1.mm.bing.net/th?id=OIP.HBYAzXT10ti5qiejVzQG9wHaE8&pid=Api&P=0&h=220', 'Air mineral yang menyegarkan tubuh.'),
(21, 7, 'Soda', 10000.00, 'Minuman', 0, 'https://tse4.mm.bing.net/th?id=OIP.94TYxlz0WvYCW4lXLVW_KQHaEK&pid=Api&P=0&h=220', 'Soda dengan rasa yang menyegarkan.'),
(22, 8, 'Sofa', 1000000.00, 'Perabotan', 10, 'https://tse3.mm.bing.net/th?id=OIP.wELK5khXZ7T9hemYVUV3ewAAAA&pid=Api&P=0&h=220', 'Sofa yang nyaman untuk ruang tamu.'),
(23, 8, 'Meja Makan', 750000.00, 'Perabotan', 15, 'https://tse3.mm.bing.net/th?id=OIP.VigIPSeHqQODiZ1s0ZQKzgHaE6&pid=Api&P=0&h=220', 'Meja makan dengan desain modern.'),
(24, 8, 'Lemari Pakaian', 1200000.00, 'Perabotan', 5, 'https://tse1.mm.bing.net/th?id=OIP.oZizV4YRdJ0xjDlf8C31SQHaHa&pid=Api&P=0&h=220', 'Lemari pakaian besar dengan banyak ruang.'),
(25, 9, 'Lipstik', 80000.00, 'Kosmetik', 10, 'https://tse2.mm.bing.net/th?id=OIP.evsWxvvRJEzi6OgxdE6WiQHaHa&pid=Api&P=0&h=220', 'Lipstik dengan warna yang tahan lama.'),
(26, 9, 'Maskara', 120000.00, 'Kosmetik', 15, 'https://tse1.mm.bing.net/th?id=OIP.mEQT_P8sMs9O3_TpkVgPdgAAAA&pid=Api&P=0&h=220', 'Maskara untuk tampilan mata yang lebih tajam.'),
(27, 9, 'Perawatan Wajah', 150000.00, 'Kosmetik', 20, 'https://tse1.mm.bing.net/th?id=OIP.Ytj5YDrKhyMu5SyDxpZe3AHaEK&pid=Api&P=0&h=220', 'Perawatan wajah dengan bahan alami.'),
(28, 10, 'Jam Tangan', 200000.00, 'Aksesoris', 10, 'https://tse3.mm.bing.net/th?id=OIP.baMvc0CCNcAIFda308HXqQHaHa&pid=Api&P=0&h=220', 'Jam tangan dengan desain elegan.'),
(29, 10, 'Tas Wanita', 350000.00, 'Aksesoris', 20, 'https://tse2.mm.bing.net/th?id=OIP.yENFK5SUq65DOYnA0lvinQHaF7&pid=Api&P=0&h=220', 'Tas wanita dengan desain fashionable.'),
(30, 10, 'Kacamata', 150000.00, 'Aksesoris', 15, 'https://tse1.mm.bing.net/th?id=OIP.jrgiX1FL83sQ5arYYnhA2wHaHa&pid=Api&P=0&h=220', 'Kacamata stylish untuk melindungi mata dari sinar UV.'),
(31, 11, 'Smartwatch', 1200000.00, 'Gadget', 10, 'https://tse1.mm.bing.net/th?id=OIP.0l6lfE7kqFJZyX2YHVOYcwHaHc&pid=Api&P=0&h=220', 'Smartwatch dengan fitur canggih.'),
(32, 11, 'Earphone', 500000.00, 'Gadget', 15, 'https://tse3.mm.bing.net/th?id=OIP.tUKHCp_LdwVVDL8KjLOdnAHaHo&pid=Api&P=0&h=220', 'Earphone dengan kualitas suara tinggi.'),
(33, 11, 'Powerbank', 300000.00, 'Gadget', 20, 'https://tse1.mm.bing.net/th?id=OIP.RvrVVgm5vRSOgGT9stzLeAHaGk&pid=Api&P=0&h=220', 'Powerbank kapasitas besar untuk pengisian cepat.'),
(34, 12, 'Sepatu Sneakers', 350000.00, 'Sepatu', 10, 'https://tse3.mm.bing.net/th?id=OIP.4vpd1Yw9jcc2CGNFYV4EwgAAAA&pid=Api&P=0&h=220', 'Sepatu sneakers nyaman dan trendy.'),
(35, 12, 'Sepatu Formal', 500000.00, 'Sepatu', 15, 'https://tse1.mm.bing.net/th?id=OIP.K4IXPk-T7KCZ-hInh2PjxwHaFE&pid=Api&P=0&h=220', 'Sepatu formal untuk acara penting.'),
(36, 12, 'Sepatu Olahraga', 600000.00, 'Sepatu', 20, 'https://tse2.mm.bing.net/th?id=OIP.PpF2_JC934aQB8eeG9-KTAHaHa&pid=Api&P=0&h=220', 'Sepatu olahraga dengan dukungan ekstra.');

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE `stores` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`id`, `name`, `avatar_url`) VALUES
(1, 'Toko Elektronik', 'https://tse4.mm.bing.net/th?id=OIP.x_hFGZwAMbAln8CoCi5crQHaHa&pid=Api&P=0&h=220'),
(2, 'Toko Pakaian', 'https://tse2.mm.bing.net/th?id=OIP.WKqlc57tBsoO1auWRXJb-wHaHa&pid=Api&P=0&h=220'),
(3, 'Toko Mainan', 'https://tse2.mm.bing.net/th?id=OIP.nXrexYSu5nOzt4ZT1Ydn2AAAAA&pid=Api&P=0&h=220'),
(4, 'Toko Buku', 'https://tse4.mm.bing.net/th?id=OIP.1trmLie9PzAnMy_m6BvVbgHaHa&pid=Api&P=0&h=220'),
(5, 'Toko Olahraga', 'https://tse2.mm.bing.net/th?id=OIP.yw8QPmivppbskA2P7awzIAHaHa&pid=Api&P=0&h=220'),
(6, 'Toko Makanan', 'https://tse1.mm.bing.net/th?id=OIP.-N_vT9wXmRnQ2GPvjYmIkwHaHa&pid=Api&P=0&h=220'),
(7, 'Toko Minuman', 'https://tse2.mm.bing.net/th?id=OIP.RyPp6LBa08D9qVronPsPQwHaE7&pid=Api&P=0&h=220'),
(8, 'Toko Perabotan', 'https://tse2.mm.bing.net/th?id=OIP.ZwhtWGp7InmqsqB4thwN0gHaHa&pid=Api&P=0&h=220'),
(9, 'Toko Kosmetik', 'https://tse4.mm.bing.net/th?id=OIP.2omkajJ8N9y568ZoFf7pjgHaD2&pid=Api&P=0&h=220'),
(10, 'Toko Aksesoris', 'https://tse2.mm.bing.net/th?id=OIP.tC4mLeOIZ3LMPERbBFm4bAHaEK&pid=Api&P=0&h=220'),
(11, 'Toko Gadget', 'https://tse1.mm.bing.net/th?id=OIP.I6MK8mNrrPZoJKtmji1yqQHaHa&pid=Api&P=0&h=220'),
(12, 'Toko Sepatu', 'https://tse2.mm.bing.net/th?id=OIP.R7J0Xl2z2vccTR0F41ZzkAHaFb&pid=Api&P=0&h=220');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`) VALUES
(1, 'Tasya', 'tasya@gmail.com'),
(2, 'Dela', 'dela@gmail.com'),
(3, 'Rasid', 'rasid@gmail.com'),
(4, 'Purba', 'purba@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `store_id` (`store_id`);

--
-- Indexes for table `stores`
--
ALTER TABLE `stores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `stores`
--
ALTER TABLE `stores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
