-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 18-01-2021 a las 19:45:39
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

--
-- Volcado de datos para la tabla `Categoria`
--

INSERT INTO `Categoria` (`idCat`, `nom`) VALUES
(1, 'Aventuras'),
(2, 'Educativa'),
(3, 'Familiar'),
(4, 'Historico'),
(5, 'Romantico'),
(12, 'wde'),
(13, 'jgbdshjbjol'),
(14, 'kjdnskh'),
(15, 'gjnbdsjgbndojbgodg'),
(16, 'ghdsfhdfhjfjgjdfgdfghf'),
(17, 'hfdjhfj'),
(18, 'JOPETAS');

--
-- Volcado de datos para la tabla `Experiencia`
--

INSERT INTO `Experiencia` (`idExp`, `titol`, `data`, `text`, `imatge`, `coordenades`, `likes`, `dislikes`, `estat`, `idCat`, `username`, `reportat`) VALUES
(1, 'Viatge Albania en grup', '2020-10-07', 'Es el pais de la<b>s so</b>nrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y des<i>eo qu</i>e el turismo, que no tardara demasiado en acudir en masa, no les cambie. Sin duda, los albaneses son lo mejor del pais. Y eso es mucho decir teniendo en cuenta los paisajazos y rincones', 'https://picsum.photos/400/300', '40.724327, 19.586418', 14, 13, 'publicada', 1, 'admin', 0),
(2, 'Viatge Tanzania Safari Nord', '2019-06-12', 'Pues fue bien <b style=\"font-style: italic;\">CHIDO </b><i>WEY. </i><b style=\"font-style: italic;\">PERO BIEN CHIFGYH</b>', 'https://picsum.photos/400/300', '-2.450819, 32.902157', 26, 24, 'publicada', 2, 'admin', 1),
(3, 'Viatge Costa Rica en grup', '2020-00-00', 'blabla costarica<b>ya boludodfg</b>hdfhdfstg', 'https://picsum.photos/400/300', '9.381387, -84.145301', 16, 7, 'publicada', 2, 'admin', 1),
(4, 'Viatge Liban Classic 10 Dies', '0000-00-00', 'blabla liban', 'https://picsum.photos/400/300', '33.902952, 35.492856', 17, 5, 'publicada', 3, 'admin', 1),
(6, 'Liban Trekking 8 Dies', '2020-06-19', 'blabla liban trekking', 'https://picsum.photos/400/300', '34.438768, 36.012988', 15, 2, 'publicada', 3, 'admin', 0),
(7, 'Viatge Grecia en grup', '0000-00-00', 'blabla Grecia RAFAAAAAAAAAAAA', 'https://picsum.photos/400/300', '37.971790, 23.726150', 14, 6, 'publicada', 4, 'admin', 0),
(8, 'Viatge Serbia en grup', '0000-00-00', 'Seeeeeeeeeeeeeeeeeeeeeeeerbia', 'https://picsum.photos/400/300', '44.817852, 20.445447', 4, 19, 'publicada', 4, 'admin', 0),
(11, 'Viatge al Raval en grup', '0000-00-00', 'blabla Raval sucks', 'https://picsum.photos/400/300', '41.378704, 2.170521', 0, 0, 'rebutjada', 1, 'admin', 0),
(54, 'qwaerqewrqwerqewrqew', '2021-01-15', 'rqwerqewrqewrqewrqewrqewr', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 5, 'admin', 0),
(55, 'eryertfhdgfhbcdghtf', '2021-01-15', 'edfghdgfhdgfhgfdhdtgfhcdv', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 2, 'admin', 0),
(57, 'NUEVA', '2021-01-15', 'SDEGFDSG', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 2, 'admin', 0),
(58, 'nueva 2', '2021-01-15', 'sdgfds', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 1, 'admin', 0),
(59, 'NUEVA 3', '2021-01-17', 'sdfgdf', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 5, 'admin', 0),
(60, 'NUEVA 4', '2021-01-17', 'FSDGSDFGDF', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 4, 'admin', 0),
(61, '123', '2021-01-17', '132', 'https://picsum.photos/400/300', '-1,-4', 0, 0, 'publicada', 1, 'j1', 0),
(62, 'jordiiiiiiii', '2021-01-17', 'werewrw', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j1', 0),
(67, 'hola bb', '2020-10-07', 'hfjahohofh', 'https://picsum.photos/400/300', '34.438768, 36.012988', 0, 0, 'publicada', 1, 'admin', 0),
(68, 'ULTIMISIMA', '2021-01-17', 'SDFGDFHGFHDFHG', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 12, 'admin', 0),
(70, 'DE LOCOS', '2021-01-17', 'PELOTUDO', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 13, 'admin', 0),
(71, 'JODER QUE FEO', '2021-01-17', 'FEISIMO', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 2, 'admin', 0),
(72, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 1, 0, 'publicada', 1, 'j2', 0),
(73, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(74, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(75, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(76, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(77, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(78, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(79, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(80, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(81, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(82, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(83, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(84, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(85, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(86, 'tontooooooo', '2021-01-17', '567567', 'https://picsum.photos/400/300', '-2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(88, 'COMEONE', '2021-01-17', 'UHBUH', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 16, 'admin', 0),
(89, 'jh', '2021-01-17', 'jh', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 15, 'jh', 0),
(90, 'jb', '2021-01-17', 'jb', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 15, 'jb', 0),
(92, 'bv', '2021-01-17', 'bv', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 15, 'bv', 0),
(96, 'JIJO', '2021-01-18', 'JDGHDG', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 14, 'admin', 0),
(98, 'fgvnvbn', '2021-01-18', '6', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 17, 'admin', 0),
(107, 'sf', '2021-01-18', 'sfd', 'https://picsum.photos/400/300', '-3,-3', 0, 0, 'publicada', 1, 'j2', 0),
(108, '999999999999999999', '2021-01-18', 'fhg', 'https://picsum.photos/400/300', '90,90', 1, 0, 'publicada', 4, 'pablo', 0),
(111, 'sdfsdf', '2021-01-18', 'sfddfs', 'https://picsum.photos/400/300', '2,-2', 0, 0, 'publicada', 1, 'j2', 0),
(114, 'ESBORRANY', '2021-01-18', 'RTYHRT', 'https://picsum.photos/400/300', '90,90', 0, 0, 'publicada', 3, 'admin', 0);

--
-- Volcado de datos para la tabla `Usuari`
--

INSERT INTO `Usuari` (`nom`, `cognom`, `username`, `password`, `isAdmin`) VALUES
('1', '2', '3', '4', 0),
('admin', 'admin', 'admin', 'admin', 1),
('bv', 'bv', 'bv', 'bv', 0),
('df', 'df', 'df', 'df', 0),
('j1', 'j1', 'j1', 'j1', 0),
('j2', 'j2', 'j2', 'j2', 0),
('jb', 'jb', 'jb', 'jb', 0),
('jh', 'jh', 'jh', 'jh', 0),
('jordi', 'jordi', 'jordi@jordi.com', 'jordi', 0),
('JP', 'JP', 'JP', 'JP', 0),
('ju', 'ju', 'ju', 'ju', 0),
('p', 'p', 'p', 'p', 0),
('pablo', 'pablo', 'pablo', 'pablo', 0),
('Rafael', 'garcia', 'rafa', 'rafa', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
