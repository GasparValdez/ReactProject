-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 27-02-2025 a las 05:21:35
-- Versión del servidor: 8.4.3
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecomm`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `file_path` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `price` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `file_path`, `description`, `price`, `updated_at`, `created_at`) VALUES
(2, 'Consola de Videojuegos Retro', 'products/hkY0YE7XWT523d5epA356KHLI8lwGrOrfBBmfXlQ.jpg', 'Tiene más de 200 juegos de NES y ARCADE', '300', '2025-02-26', '2025-02-24'),
(3, 'Ventilador para refacciones', 'products/m5sSODnbir7NkibYgXr5ejfDcIRtvNVtnb6Y6nNO.png', 'Solo funciona la luz', '500', '2025-02-26', '2025-02-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `file_path` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `file_path`) VALUES
(3, 'skeleton@gmail.com', 'skeleton@gmail.com', '$2y$10$mWn4eqyIb2o.NxSJ8JpK/e2tEagBUQuevVuTdERWHVefJs9stVxXG', 'users/BoOeHp4ysiRxsWOuwoTFMfigok0pQA19Rou7E7yH.jpg'),
(4, 'Gaspar', 'gaspar@gmail.com', '$2y$10$igwn1pLRTqDMB5vGv3Oru.ADdcnBEBCRnSLqnLAd.Uq.4ri0po5Ge', 'users/NKieJSe00ejwUeAFcymYvSKsTsLyBjXxdEYzPYKl.jpg'),
(5, 'angel', 'angel@gmail.com', '$2y$10$6y5kvzwsuIzvulaYgaTbE.gDyWaap9I6yzRsdgXRkJpm1DU3eiw8O', 'users/6PaLcHZ0ZcYr1Mf0TluFEPk6VyXUoajjo1GydQus.jpg'),
(6, 'Paco', 'paquito@gmail.com', '$2y$10$7wyR.EvwH03osJvQfVOPveTxKYPIDmH0HMNRj0TPvEWYlUnrv3Csm', 'users/REdfozSWLfbSXb7P3UPO9K0HxZ3FaNOuwyolSSEp.jpg'),
(7, 'keso', 'keso@gmail.com', '$2y$10$NoX/jptePQ/BT7ovioVW4e0ANtAbWj.vVtRcm9RyM9t7GlYp.8Ay.', 'users/aOSZ5cj37rWAYfNz4birmtvh42NHuz4AYtBAjLBn.jpg'),
(11, 'DarkNight', 'darkknight@gmail.com', '$2y$10$lYlvsNYtLCbiM9QIYwInNOe63nxTe48E/E/35PEgyvDOABKcRPdr2', 'users/ZQVjkiyxTirfDdPhhdUoEkNZemr3lnShsAvaDVcA.jpg'),
(12, 'Carlos Kauil', 'carlitos@gmail.com', '$2y$10$wjk6Me8UkFQHi6dNmgEVL.uUMBOUJiMY5uQ0KR/ZFvMaB2Kh3PdyO', 'users/0S13E2jlobUsFaAV1Vuzxj9b8Gc1mlBLV7vUWBuK.jpg'),
(14, 'vale', 'vale@gmail.com', '$2y$10$n8PnWpNQNa4QJEghQJUCS.6YzGKl0yMUSiKCqDptqicFoBNsCkzcC', 'users/MZeqfSHbigz2wiaWwaFJL1iXbEC7dAJ3FoTI9bLg.jpg'),
(17, 'gasparnuevo', 'gasparnuevo@gmail.com', '$2y$10$CjnKBdCEFxPMTxDrOfIgwOQNnGexIlwhZCgqaGhGDdLKM9gt5oz7G', 'users/nQoa4jh5YG6gpYrgEzSTDnD1jcee3h4DABp0GPDJ.jpg'),
(18, 'angel solisss', 'angel@gmail.com', '$2y$10$KRyccNyzIPI707EnmURLhuIsGId0TO0ebDdDcYnhKVXQOmFnyT.lu', 'users/azmkjeBETcCpoFsG2xrKuTxCGeQAlGpeXs2EwKN7.jpg');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
