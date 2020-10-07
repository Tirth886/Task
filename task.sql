-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 07, 2020 at 08:40 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task`
--

-- --------------------------------------------------------

--
-- Table structure for table `appliedjob`
--

CREATE TABLE `appliedjob` (
  `id` int(11) NOT NULL,
  `jobid` varchar(100) NOT NULL,
  `userid` varchar(100) NOT NULL,
  `astatus` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appliedjob`
--

INSERT INTO `appliedjob` (`id`, `jobid`, `userid`, `astatus`) VALUES
(1, '3', '116992391017131875540', 'pending'),
(2, '6', '116992391017131875540', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` int(11) NOT NULL,
  `userid` varchar(255) NOT NULL,
  `job_title` varchar(100) NOT NULL,
  `job_description` text NOT NULL,
  `area` text NOT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `company_name` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `userid`, `job_title`, `job_description`, `area`, `city`, `state`, `country`, `company_name`, `status`) VALUES
(2, '106994797624381356724', 'SDf', 'dfhgfhfgjaFDASDF', 'tsykisxyjsfdgthgh', 'ahmedabad', 'gujarat', 'india', 'xghsrujuathrgb', 'open'),
(3, '106994797624381356724', 'SDf', 'dfhgfhfgj', 'tsykisxyjsfdgthgh', 'ahmedabad', 'gujarat', 'india', 'xghsrujuathrgb', 'close'),
(6, '106994797624381356724', 'SDfasdasd', 'dfhgfhfgj', 'tsykisxyjsfdgthgh', 'ahmedabad', 'gujarat', 'india', 'xghsrujuathrgb', 'open');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `sub` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `number` varchar(50) NOT NULL,
  `role` varchar(20) NOT NULL,
  `picture` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `sub`, `name`, `email`, `number`, `role`, `picture`) VALUES
(5, '106994797624381356724', 'Tirth Jain', 'tirth886jain@gmail.com', '7984814283', 'recruiter', 'https://lh3.googleusercontent.com/a-/AOh14GjKdhccPldY1CMspGe5Nx-5RGvtTBli8A00Q0OjZA'),
(9, '116992391017131875540', 'TIRTH JAIN', 'tirthjain8866@gmail.com', '8866802619', 'candidate', 'https://lh4.googleusercontent.com/-Mb1z6Rx35J0/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucloCwrfDd39ktrbRZ2VNdWtVT6bkA/photo.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appliedjob`
--
ALTER TABLE `appliedjob`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userid` (`sub`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `phone` (`number`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appliedjob`
--
ALTER TABLE `appliedjob`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
