-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 19-01-2021 a las 11:56:24
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
(5, 'Romantico'),
(23, 'Categoria Nueva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Experiencia`
--

CREATE TABLE `Experiencia` (
  `idExp` int(11) NOT NULL,
  `titol` varchar(200) NOT NULL,
  `data` date NOT NULL,
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
(1, 'Viatge Albania en grup', '2020-10-07', 'Es el pais de la<b>s so</b>nrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y des<i>eo qu</i>e el turismo, que no tardara demasiado en acudir en masa, no les cambie. Sin duda, los albaneses son lo mejor del pais. Y eso es mucho decir <b>teniendo</b> en cuenta los paisajazos y rincones', 'Albania.jpg', '40.724327, 19.586418', 17, 14, 'publicada', 1, 'admin', 0),
(2, 'Viatge Tanzania Safari Nord', '2019-06-12', 'Pues fue bien <b style=\"font-style: italic;\">CHIDO </b><i>WEY. </i><b style=\"font-style: italic;\">PERO BIEN CHIFGYH</b>', 'descarga.jpg', '-2.450819, 32.902157', 26, 25, 'publicada', 2, 'admin', 1),
(3, 'Viatge Costa Rica en grup', '2020-00-00', 'blabla costarica<b>ya boludodfg</b>hdfhdfstg', 'CostaRica.jpg', '9.381387, -84.145301', 16, 7, 'publicada', 2, 'admin', 1),
(4, 'Viatge Liban Classic 10 Dies', '0000-00-00', 'blabla liban', 'Libano.jpg', '33.902952, 35.492856', 18, 5, 'publicada', 3, 'admin', 0),
(6, 'Liban Trekking 8 Dies', '2020-06-19', 'blabla liban trekking', 'Libano.jpg', '34.438768, 36.012988', 15, 2, 'publicada', 3, 'admin', 0),
(7, 'Viatge Grecia en grup', '0000-00-00', 'blabla Grecia RAFAAAAAAAAAAAA', 'Grecia.jpg', '37.971790, 23.726150', 16, 6, 'publicada', 4, 'admin', 0),
(8, 'Viatge Serbia en grup', '0000-00-00', 'Seeeeeeeeeeeeeeeeeeeeeeeerbia', 'Serbia.jpg', '44.817852, 20.445447', 4, 19, 'publicada', 4, 'admin', 0),
(11, 'Viatge al Raval en grup', '0000-00-00', 'blabla Raval sucks', 'Raval.jpg', '41.378704, 2.170521', 0, 0, 'publicada', 1, 'admin', 0),
(183, 'Default', '2021-01-19', '<b><i>Default</i></b>', 'default.jpg', '4,4', 1, 0, 'publicada', 5, 'admin', 0);

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
('JA', 'JA', 'JA', 'JA', 0),
('jordi', 'jordi', 'jordi@jordi.com', 'jordi', 0),
('pablo', 'pablo', 'pablo', 'pablo', 0),
('Rafael', 'Garcia', 'rafa', 'rafa', 0);

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
  MODIFY `idCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT de la tabla `Experiencia`
--
ALTER TABLE `Experiencia`
  MODIFY `idExp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `Experiencia`
--
ALTER TABLE `Experiencia`
  ADD CONSTRAINT `Experiencia_ibfk_1` FOREIGN KEY (`idCat`) REFERENCES `Categoria` (`idCat`),
  ADD CONSTRAINT `Experiencia_ibfk_2` FOREIGN KEY (`username`) REFERENCES `Usuari` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
