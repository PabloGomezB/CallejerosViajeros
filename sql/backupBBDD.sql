-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 17-12-2020 a las 12:06:19
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Categoria`
--

CREATE TABLE `Categoria` (
  `idCat` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `Categoria`
--

INSERT INTO `Categoria` (`idCat`, `nom`) VALUES
(1, 'aventures'),
(2, 'muntanyisme'),
(3, 'familiar'),
(4, 'historic'),
(5, 'romantic');

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

--
-- Volcado de datos para la tabla `Experiencia`
--

INSERT INTO `Experiencia` (`idExp`, `titol`, `data`, `text`, `imatge`, `coordenades`, `likes`, `dislikes`, `estat`, `idCat`, `idUsu`, `reportat`) VALUES
(1, 'Viatge Albania, Kosovo i Macedonia en grup. Nadal', '0000-00-00', 'blabla albania, kosovo i macedonia', 'imgAlbania.jpg', '40.724327, 19.586418', 34, 19, 'publicada', 4, 1, 1),
(3, 'Viatge Costa Rica en grup. Nadal', '0000-00-00', 'blabla costarica', 'imgCostarica.jpg', '9.381387, -84.145301', 10, 5, 'publicada', 5, 1, 1),
(4, 'Viatge Liban Classic 10 Dies. Nadal', '0000-00-00', 'blabla liban', 'imgLiban.jpg', '33.902952, 35.492856', 19, 4, 'publicada', 4, 1, 0),
(5, 'Viatge Emirats Arabs en grup. Nadal', '0000-00-00', 'blabla Emirats Arabs', 'imgEmiratsarabs.jpg', '24.490505, 54.352267', 2, 16, 'publicada', 5, 1, 0),
(6, 'Liban Trekking 8 Dies. Nadal', '0000-00-00', 'blabla liban trekking', 'imgLibantreking.jpg', '34.438768, 36.012988', 16, 211, 'publicada', 2, 1, 0),
(7, 'Viatge Grecia en grup. Nadal', '0000-00-00', 'blabla Grecia', 'imgGrecia.jpg', '37.971790, 23.726150', 13, 6, 'publicada', 4, 1, 0),
(8, 'Viatge Serbia en grup. Ciutats i parcs de l\'antiga Iugoslavia. Nadal', '0000-00-00', 'blabla Serbia', 'imgSerbia.jpg', '44.817852, 20.445447', 2, 18, 'publicada', 4, 1, 0),
(10, 'Viatge Sudan en grup. Nadal', '0000-00-00', 'blabla Sudan', 'imgSudan.jpg', '19.568996, 37.240980', 0, 0, 'esborrany', 1, 1, 0),
(11, 'Viatge al Raval en grup. Nadal', '0000-00-00', 'blabla Raval sucks', 'imgRaval.jpg', '41.378704, 2.170521', 0, 0, 'rebutjada', 1, 1, 0);

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
-- Volcado de datos para la tabla `Usuari`
--

INSERT INTO `Usuari` (`idUsu`, `nom`, `cognom`, `username`, `password`) VALUES
(1, 'admin', 'admin', 'admin', 'admin'),
(8, 'a', 'a', 'a', 'a'),
(9, 'q', 'q', 'q', 'q'),
(10, 'Viena', 'Viena', 'viena@gmail.com', 'viena'),
(11, 'Pablo', 'Alfombra', 'a18alfombra@inspedralbes.cat', 'angeltequiero'),
(12, 'pepe', 'pepe', 'pepe', 'pepe'),
(13, 'pepe', 'pepe', 'pepe@hotmail.com', 'pepe'),
(15, 'g', '', '', ''),
(16, 'admin', 'admin', 'admin', 'admin'),
(17, 'admin', 'admin', 'admin', 'admin'),
(18, 'admin', 'admin', 'admin', 'admin'),
(19, 'admin', 'admin', 'admin', 'admin'),
(26, 't', 't', 't', 't'),
(27, 't', 't', 't', 't'),
(28, 'h', 'h', 'h', 'h');

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
  MODIFY `idUsu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
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
