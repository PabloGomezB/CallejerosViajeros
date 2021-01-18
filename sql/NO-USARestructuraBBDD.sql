-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 15-12-2020 a las 12:05:06
-- Versión del servidor: 10.1.47-MariaDB-0+deb9u1
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `a16miqboipos_pr`
--
CREATE DATABASE IF NOT EXISTS `a16miqboipos_pr` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `a16miqboipos_pr`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categoria`
--

CREATE TABLE `Categoria` (
  `idCat` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Experiencia`
--

CREATE TABLE `Experiencia` (
  `idExp` int(11) NOT NULL,
  `titol` varchar(200) NOT NULL,
  `data` varchar(30) NOT NULL,
  `text` varchar(300) NOT NULL,
  `imatge` varchar(50) NOT NULL,
  `coordenades` varchar(100) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `estat` enum('publicada','rebutjada','esborrany') NOT NULL,
  `idCat` int(11) NOT NULL,
  `idUsu` int(11) NOT NULL,
  `reportat` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuari`
--

CREATE TABLE `Usuari` (
  `idUsu` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `cognom` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Categoria`
--
ALTER TABLE `Categoria`
  ADD PRIMARY KEY (`idCat`);

--
-- Indices de la tabla `Experiencia`
--
ALTER TABLE `Experiencia`
  ADD PRIMARY KEY (`idExp`),
  ADD KEY `idCat` (`idCat`),
  ADD KEY `idUsu` (`idUsu`);

--
-- Indices de la tabla `Usuari`
--
ALTER TABLE `Usuari`
  ADD PRIMARY KEY (`idUsu`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Categoria`
--
ALTER TABLE `Categoria`
  MODIFY `idCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `Experiencia`
--
ALTER TABLE `Experiencia`
  MODIFY `idExp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT de la tabla `Usuari`
--
ALTER TABLE `Usuari`
  MODIFY `idUsu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Experiencia`
--
ALTER TABLE `Experiencia`
  ADD CONSTRAINT `Experiencia_ibfk_1` FOREIGN KEY (`idCat`) REFERENCES `Categoria` (`idCat`),
  ADD CONSTRAINT `Experiencia_ibfk_2` FOREIGN KEY (`idUsu`) REFERENCES `Usuari` (`idUsu`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
