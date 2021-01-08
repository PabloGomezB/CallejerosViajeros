-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 08-01-2021 a las 14:09:23
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
(1, 'Aventuras'),
(2, 'Educativa'),
(3, 'Familiar'),
(4, 'Historico'),
(5, 'Romantico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Experiencia`
--

CREATE TABLE `Experiencia` (
  `idExp` int(11) NOT NULL,
  `titol` varchar(200) NOT NULL,
  `data` varchar(30) NOT NULL,
  `text` mediumtext NOT NULL,
  `imatge` varchar(50) NOT NULL,
  `coordenades` varchar(100) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `estat` enum('publicada','rebutjada','esborrany') NOT NULL,
  `idCat` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `reportat` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `Experiencia`
--

INSERT INTO `Experiencia` (`idExp`, `titol`, `data`, `text`, `imatge`, `coordenades`, `likes`, `dislikes`, `estat`, `idCat`, `username`, `reportat`) VALUES
(1, 'Viatge Albania en grup', '2020-10-07', 'Es el pais de la<b>s so</b>nrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y des<i>eo qu</i>e el turismo, que no tardara demasiado en acudir en masa, no les cambie. Sin duda, los albaneses son lo mejor del pais. Y eso es mucho decir teniendo en cuenta los paisajazos y rincones espectaculares que se cruzaran en tu camino.', 'Albania.jpg', '40.724327, 19.586418', 8, 13, 'publicada', 4, 'admin', 0),
(2, 'Viatge Tanzania Safari Nord', '2018-06-12', 'Pues fue bien <b style=\"font-style: italic;\">CHIDO </b><i>WEY. </i><b style=\"font-style: italic;\">PERO BIEN CHINGON</b>', 'Tanzania.jpg', '-2.450819, 32.902157', 13, 22, 'publicada', 1, 'admin', 1),
(3, 'Viatge Costa Rica en grup', '0000-00-00', 'blabla costarica<b>ya boludodfg</b>hdfh', 'CostaRica.jpg', '9.381387, -84.145301', 11, 7, 'publicada', 5, 'admin', 1),
(4, 'Viatge Liban Classic 10 Dies', '0000-00-00', 'blabla liban', 'Libano.jpg', '33.902952, 35.492856', 15, 2, 'publicada', 4, 'admin', 1),
(5, 'Viatge Emirats Arabs en grup', '0000-00-00', 'blabla Emirats Arabs', 'EmiratosArabes.jpg', '24.490505, 54.352267', 2, 15, 'publicada', 5, 'rafa', 0),
(6, 'Liban Trekking 8 Dies', '0000-00-00', 'blabla liban trekking', 'Monte.jpg', '34.438768, 36.012988', 15, 2, 'publicada', 2, 'admin', 0),
(7, 'Viatge Grecia en grup', '0000-00-00', 'blabla Grecia', 'Grecia.jpg', '37.971790, 23.726150', 13, 6, 'publicada', 4, 'admin', 0),
(8, 'Viatge Serbia en grup', '0000-00-00', 'blabla Serbia', 'Serbia.jpg', '44.817852, 20.445447', 2, 18, 'publicada', 4, 'admin', 0),
(10, 'Viatge Sudan en grup', '0000-00-00', 'blabla Sudan', 'Sudan.jpg', '19.568996, 37.240980', 0, 0, 'esborrany', 1, 'admin', 0),
(11, 'Viatge al Raval en grup', '0000-00-00', 'blabla Raval sucks', 'Raval.jpg', '41.378704, 2.170521', 0, 0, 'rebutjada', 1, 'admin', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuari`
--

CREATE TABLE `Usuari` (
  `nom` varchar(50) NOT NULL,
  `cognom` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `Usuari`
--

INSERT INTO `Usuari` (`nom`, `cognom`, `username`, `password`, `isAdmin`) VALUES
('admin', 'admin', 'admin', 'admin', 1),
('rafa', 'rafa', 'rafa', 'rafa', 0);

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
  ADD KEY `username` (`username`);

--
-- Indices de la tabla `Usuari`
--
ALTER TABLE `Usuari`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Categoria`
--
ALTER TABLE `Categoria`
  MODIFY `idCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `Experiencia`
--
ALTER TABLE `Experiencia`
  MODIFY `idExp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Experiencia`
--
ALTER TABLE `Experiencia`
  ADD CONSTRAINT `Experiencia_ibfk_1` FOREIGN KEY (`idCat`) REFERENCES `Categoria` (`idCat`),
  ADD CONSTRAINT `Experiencia_ibfk_2` FOREIGN KEY (`username`) REFERENCES `Usuari` (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
