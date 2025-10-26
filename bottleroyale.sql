-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 25, 2025 at 11:43 PM
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
-- Database: `bottleroyale`
--

-- --------------------------------------------------------

--
-- Table structure for table `airline`
--

CREATE TABLE `airline` (
  `idAirline` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `rule` varchar(10) NOT NULL,
  `range` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `airline`
--

INSERT INTO `airline` (`idAirline`, `name`, `rule`, `range`) VALUES
(1, 'SkyLine Airways', 'keep', 1),
(2, 'Global Wings', 'replace', 0),
(3, 'Pacific Air', 'keep', 1),
(4, 'Euro Express', 'refill', 1),
(5, 'TransAtlantic', 'replace', 1),
(6, 'Asia Connect', 'keep', 1),
(7, 'Continental Plus', 'refill', 0),
(8, 'Ocean Airways', 'replace', 0),
(9, 'Meridian Airlines', 'keep', 1),
(10, 'Horizon Flights', 'refill', 0),
(11, 'Liberty Air', 'replace', 1),
(12, 'Royal Wings', 'keep', 0),
(13, 'Summit Airlines', 'refill', 1),
(14, 'Velocity Express', 'replace', 1),
(15, 'Coastal Air', 'refill', 0),
(16, 'Premier Flights', 'keep', 1),
(17, 'Nordic Airlines', 'keep', 1),
(18, 'Iberian Airways', 'refill', 1),
(19, 'Alpine Air', 'replace', 1),
(20, 'Caribbean Wings', 'refill', 0),
(21, 'Desert Airlines', 'replace', 0),
(22, 'Polar Express', 'keep', 1),
(23, 'Tropics Air', 'refill', 0),
(24, 'Metropolitan', 'replace', 1),
(25, 'Intercontinental', 'keep', 1);

-- --------------------------------------------------------

--
-- Table structure for table `bottle`
--

CREATE TABLE `bottle` (
  `idBottle` int(11) NOT NULL,
  `idBM` int(11) NOT NULL,
  `licor` varchar(20) NOT NULL,
  `size` int(11) NOT NULL COMMENT 'Measured in ml (milliliters)',
  `brand` varchar(30) NOT NULL,
  `decision` boolean,
  `fillLevel` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `bottle`
--

INSERT INTO `bottle` (`idBottle`, `idBM`, `licor`, `size`, `brand`, `fillLevel`) VALUES
(1, 1, 'Whiskey', 750, 'Jack Daniels', 0.85),
(2, 1, 'Vodka', 1000, 'Smirnoff', 0.6),
(3, 1, 'Rum', 750, 'Bacardi', 0.95),
(4, 2, 'Gin', 700, 'Tanqueray', 0.4),
(5, 2, 'Tequila', 750, 'Jose Cuervo', 0.75),
(6, 3, 'Whiskey', 750, 'Johnnie Walker', 0.3),
(7, 3, 'Vodka', 1000, 'Absolut', 0.88),
(8, 3, 'Cognac', 700, 'Hennessy', 0.55),
(9, 4, 'Rum', 750, 'Captain Morgan', 0.92),
(10, 4, 'Gin', 750, 'Bombay Sapphire', 0.25),
(11, 5, 'Whiskey', 750, 'Chivas Regal', 0.78),
(12, 5, 'Vodka', 1000, 'Grey Goose', 0.65),
(13, 5, 'Liqueur', 500, 'Baileys', 0.5),
(14, 6, 'Tequila', 750, 'Patron', 0.82),
(15, 6, 'Rum', 750, 'Havana Club', 0.45),
(16, 7, 'Whiskey', 750, 'Glenfiddich', 0.9),
(17, 7, 'Gin', 700, 'Hendricks', 0.35),
(18, 7, 'Vodka', 1000, 'Belvedere', 0.7),
(19, 8, 'Cognac', 700, 'Remy Martin', 0.88),
(20, 8, 'Liqueur', 750, 'Grand Marnier', 0.42),
(21, 9, 'Whiskey', 750, 'Macallan', 0.95),
(22, 9, 'Rum', 750, 'Mount Gay', 0.58),
(23, 9, 'Vodka', 1000, 'Ketel One', 0.72),
(24, 10, 'Gin', 750, 'Beefeater', 0.38),
(25, 10, 'Tequila', 750, 'Don Julio', 0.85),
(26, 11, 'Whiskey', 750, 'Crown Royal', 0.62),
(27, 11, 'Vodka', 1000, 'Stolichnaya', 0.91),
(28, 11, 'Sake', 720, 'Dassai', 0.48),
(29, 12, 'Rum', 750, 'Diplomatico', 0.77),
(30, 12, 'Gin', 700, 'The Botanist', 0.33),
(31, 13, 'Whiskey', 750, 'Jameson', 0.68),
(32, 13, 'Tequila', 750, 'Herradura', 0.54),
(33, 13, 'Vodka', 1000, 'Ciroc', 0.86),
(34, 14, 'Cognac', 700, 'Courvoisier', 0.29),
(35, 14, 'Liqueur', 500, 'Kahlua', 0.94),
(36, 15, 'Whiskey', 750, 'Bushmills', 0.71),
(37, 15, 'Rum', 750, 'Appleton Estate', 0.47),
(38, 15, 'Vodka', 1000, 'Skyy', 0.83),
(39, 16, 'Gin', 750, 'Plymouth', 0.36),
(40, 16, 'Tequila', 750, 'Espolon', 0.79),
(41, 17, 'Whiskey', 750, 'Makers Mark', 0.66),
(42, 17, 'Vodka', 1000, 'Titos', 0.52),
(43, 17, 'Brandy', 700, 'Torres', 0.89),
(44, 18, 'Rum', 750, 'Ron Zacapa', 0.41),
(45, 18, 'Gin', 750, 'Monkey 47', 0.74),
(46, 19, 'Whiskey', 750, 'Wild Turkey', 0.93),
(47, 19, 'Tequila', 750, 'Casamigos', 0.59),
(48, 19, 'Vodka', 1000, 'Pinnacle', 0.67),
(49, 20, 'Liqueur', 750, 'Cointreau', 0.32),
(50, 20, 'Rum', 750, 'Flor de Cana', 0.81),
(51, 21, 'Whiskey', 750, 'Bulleit', 0.76),
(52, 21, 'Vodka', 1000, 'Finlandia', 0.44),
(53, 21, 'Gin', 700, 'Roku', 0.87),
(54, 22, 'Cognac', 700, 'Martell', 0.56),
(55, 22, 'Rum', 750, 'Pyrat', 0.92),
(56, 22, 'Whiskey', 750, 'Knob Creek', 0.39),
(57, 23, 'Tequila', 750, 'Milagro', 0.73),
(58, 23, 'Vodka', 1000, 'Russian Standard', 0.61),
(59, 23, 'Gin', 750, 'Aviation', 0.84),
(60, 24, 'Whiskey', 750, 'Seagrams', 0.28),
(61, 24, 'Liqueur', 500, 'Amaretto', 0.96),
(62, 24, 'Rum', 750, 'Sailor Jerry', 0.49),
(63, 25, 'Vodka', 1000, 'New Amsterdam', 0.69),
(64, 25, 'Gin', 750, 'Seagrams', 0.53),
(65, 25, 'Whiskey', 750, 'Four Roses', 0.88);

-- --------------------------------------------------------

--
-- Table structure for table `bottlemanagement`
--

CREATE TABLE `bottlemanagement` (
  `idBM` int(11) NOT NULL,
  `idEmployee` int(11) NOT NULL,
  `dateAssigned` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idFlight` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `bottlemanagement`
--

INSERT INTO `bottlemanagement` (`idBM`, `idEmployee`, `idFlight`) VALUES
(1, 1, 'SKY1001'),
(2, 1, 'SKY1002'),
(3, 2, 'GWA2001'),
(4, 2, 'GWA2002'),
(5, 3, 'PAC3001'),
(6, 3, 'PAC3002'),
(7, 4, 'EUR4001'),
(8, 4, 'EUR4002'),
(9, 5, 'TRA5001'),
(10, 5, 'TRA5002'),
(11, 6, 'ASC6001'),
(12, 6, 'ASC6002'),
(13, 7, 'CPL7001'),
(14, 7, 'CPL7002'),
(15, 8, 'OCA8001'),
(16, 8, 'OCA8002'),
(17, 9, 'MER9001'),
(18, 9, 'MER9002'),
(19, 10, 'HOR1003'),
(20, 10, 'HOR1004'),
(21, 11, 'LIB1101'),
(22, 12, 'ROY1201'),
(23, 13, 'SUM1301'),
(24, 14, 'VEL1401'),
(25, 15, 'COA1501');

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `idCountry` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `rule` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`idCountry`, `name`, `rule`) VALUES
(1, 'United States', 'replace'),
(2, 'United Kingdom', 'keep'),
(3, 'France', 'keep'),
(4, 'Germany', 'replace'),
(5, 'Spain', 'keep'),
(6, 'Italy', 'keep'),
(7, 'Japan', 'replace'),
(8, 'China', 'replace'),
(9, 'Mexico', 'refill'),
(10, 'Canada', 'replace'),
(11, 'Brazil', 'refill'),
(12, 'Australia', 'keep'),
(13, 'Netherlands', 'keep'),
(14, 'Switzerland', 'replace'),
(15, 'United Arab Emirates', 'replace'),
(16, 'Singapore', 'replace'),
(17, 'South Korea', 'replace'),
(18, 'India', 'refill'),
(19, 'Argentina', 'refill'),
(20, 'Portugal', 'keep'),
(21, 'Greece', 'keep'),
(22, 'Sweden', 'keep'),
(23, 'Norway', 'keep'),
(24, 'Denmark', 'replace'),
(25, 'Belgium', 'keep');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `idEmployee` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `idFacility` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`idEmployee`, `username`, `password`, `idFacility`) VALUES
(1, 'jsmith', 'pass123', 1),
(2, 'mjohnson', 'secure456', 1),
(3, 'rwilliams', 'pwd789', 2),
(4, 'sbrown', 'key321', 2),
(5, 'kjones', 'lock654', 3),
(6, 'lgarcia', 'safe987', 3),
(7, 'mmartinez', 'code246', 4),
(8, 'drodriguez', 'entry135', 4),
(9, 'ahernandez', 'access753', 5),
(10, 'clopez', 'portal951', 5),
(11, 'tgonzalez', 'gate147', 6),
(12, 'pwilson', 'door258', 6),
(13, 'nanderson', 'open369', 7),
(14, 'bthomas', 'enter741', 7),
(15, 'vtaylor', 'login852', 8),
(16, 'gmoore', 'verify963', 8),
(17, 'hjackson', 'auth159', 1),
(18, 'imartin', 'check357', 2),
(19, 'flee', 'token951', 3),
(20, 'ewalker', 'badge753', 4),
(21, 'yhall', 'card456', 5),
(22, 'qallen', 'stamp789', 6),
(23, 'uyoung', 'seal123', 7),
(24, 'xking', 'mark321', 8),
(25, 'zwright', 'sign654', 1);

-- --------------------------------------------------------

--
-- Table structure for table `facility`
--

CREATE TABLE `facility` (
  `idFacility` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `facility`
--

INSERT INTO `facility` (`idFacility`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20),
(21),
(22),
(23),
(24),
(25);

-- --------------------------------------------------------

--
-- Table structure for table `flight`
--

CREATE TABLE `flight` (
  `idFlight` varchar(8) NOT NULL,
  `idAirline` int(11) NOT NULL,
  `idArrival` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `flight`
--

INSERT INTO `flight` (`idFlight`, `idAirline`, `idArrival`) VALUES
('ASC6001', 6, 17),
('ASC6002', 6, 7),
('COA1501', 15, 9),
('CPL7001', 7, 9),
('CPL7002', 7, 11),
('EUR4001', 4, 13),
('EUR4002', 4, 2),
('GWA2001', 2, 5),
('GWA2002', 2, 12),
('HOR1003', 10, 20),
('HOR1004', 10, 6),
('LIB1101', 11, 1),
('MER9001', 9, 4),
('MER9002', 9, 14),
('OCA8001', 8, 12),
('OCA8002', 8, 15),
('PAC3001', 3, 16),
('PAC3002', 3, 8),
('ROY1201', 12, 2),
('SKY1001', 1, 3),
('SKY1002', 1, 7),
('SUM1301', 13, 18),
('TRA5001', 5, 1),
('TRA5002', 5, 10),
('VEL1401', 14, 19);

-- --------------------------------------------------------

--
-- Table structure for table `works`
--

CREATE TABLE `works` (
  `idWorks` int(11) NOT NULL,
  `idFacility` int(11) NOT NULL,
  `idAirline` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `works`
--

INSERT INTO `works` (`idWorks`, `idFacility`, `idAirline`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 5),
(4, 2, 3),
(5, 2, 6),
(6, 2, 8),
(7, 3, 4),
(8, 3, 7),
(9, 3, 10),
(10, 4, 9),
(11, 4, 11),
(12, 4, 12),
(13, 5, 13),
(14, 5, 14),
(15, 5, 15),
(16, 6, 16),
(17, 6, 17),
(18, 6, 18),
(19, 7, 19),
(20, 7, 20),
(21, 7, 21),
(22, 8, 22),
(23, 8, 23),
(24, 9, 24),
(25, 9, 25);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `airline`
--
ALTER TABLE `airline`
  ADD PRIMARY KEY (`idAirline`);

--
-- Indexes for table `bottle`
--
ALTER TABLE `bottle`
  ADD PRIMARY KEY (`idBottle`),
  ADD KEY `bottleBM` (`idBM`);

--
-- Indexes for table `bottlemanagement`
--
ALTER TABLE `bottlemanagement`
  ADD PRIMARY KEY (`idBM`),
  ADD KEY `bmEmployee` (`idEmployee`),
  ADD KEY `bmFlight` (`idFlight`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`idCountry`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`idEmployee`),
  ADD KEY `employeeFacility` (`idFacility`);

--
-- Indexes for table `facility`
--
ALTER TABLE `facility`
  ADD PRIMARY KEY (`idFacility`);

--
-- Indexes for table `flight`
--
ALTER TABLE `flight`
  ADD PRIMARY KEY (`idFlight`),
  ADD KEY `flightAirline` (`idAirline`),
  ADD KEY `flightArrival` (`idArrival`);

--
-- Indexes for table `works`
--
ALTER TABLE `works`
  ADD PRIMARY KEY (`idWorks`),
  ADD KEY `worksAirline` (`idAirline`),
  ADD KEY `worksFacility` (`idFacility`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `airline`
--
ALTER TABLE `airline`
  MODIFY `idAirline` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `bottle`
--
ALTER TABLE `bottle`
  MODIFY `idBottle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `bottlemanagement`
--
ALTER TABLE `bottlemanagement`
  MODIFY `idBM` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `idCountry` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `idEmployee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `facility`
--
ALTER TABLE `facility`
  MODIFY `idFacility` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `works`
--
ALTER TABLE `works`
  MODIFY `idWorks` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bottle`
--
ALTER TABLE `bottle`
  ADD CONSTRAINT `bottleBM` FOREIGN KEY (`idBM`) REFERENCES `bottlemanagement` (`idBM`);

--
-- Constraints for table `bottlemanagement`
--
ALTER TABLE `bottlemanagement`
  ADD CONSTRAINT `bmEmployee` FOREIGN KEY (`idEmployee`) REFERENCES `employee` (`idEmployee`),
  ADD CONSTRAINT `bmFlight` FOREIGN KEY (`idFlight`) REFERENCES `flight` (`idFlight`);

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employeeFacility` FOREIGN KEY (`idFacility`) REFERENCES `facility` (`idFacility`);

--
-- Constraints for table `flight`
--
ALTER TABLE `flight`
  ADD CONSTRAINT `flightAirline` FOREIGN KEY (`idAirline`) REFERENCES `airline` (`idAirline`),
  ADD CONSTRAINT `flightArrival` FOREIGN KEY (`idArrival`) REFERENCES `country` (`idCountry`);

--
-- Constraints for table `works`
--
ALTER TABLE `works`
  ADD CONSTRAINT `worksAirline` FOREIGN KEY (`idAirline`) REFERENCES `airline` (`idAirline`),
  ADD CONSTRAINT `worksFacility` FOREIGN KEY (`idFacility`) REFERENCES `facility` (`idFacility`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
