-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : ven. 29 nov. 2024 à 08:01
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `parc_animalier`
--

-- --------------------------------------------------------

--
-- Structure de la table `animals`
--

DROP TABLE IF EXISTS `animals`;
CREATE TABLE IF NOT EXISTS `animals` (
  `animal_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `enclosure_id` int DEFAULT NULL,
  `biome_id` int DEFAULT NULL,
  PRIMARY KEY (`animal_id`),
  KEY `enclosure_id` (`enclosure_id`),
  KEY `biome_id` (`biome_id`)
) ENGINE=MyISAM AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `animals`
--

INSERT INTO `animals` (`animal_id`, `name`, `description`, `enclosure_id`, `biome_id`) VALUES
(1, 'Cigogne', 'Grand oiseau échassier, souvent associé à la migration et aux zones humides.', 1, 1),
(2, 'Marabout', 'Grand oiseau charognard d’Afrique, reconnaissable par son long bec.', 1, 1),
(3, 'Oryx algazelle', 'Antilope blanche aux longues cornes, adaptée aux environnements désertiques.', 2, 1),
(4, 'Watusi', 'Bovin africain célèbre pour ses longues cornes impressionnantes.', 2, 1),
(5, 'Âne de somalie', 'Espèce rare d’âne, connue pour sa robustesse et ses rayures sur les pattes.', 2, 1),
(6, 'Yack', 'Grand bœuf domestiqué des montagnes, reconnaissable par ses longs poils.', 3, 1),
(7, 'Mouton noir', 'Un mouton à la laine sombre, souvent utilisé pour son caractère rustique.', 3, 1),
(8, 'Bison', 'Mammifère imposant, connu pour sa grande bosse et sa force.', 4, 1),
(9, 'Âne de provence', 'Un âne robuste, souvent utilisé pour le transport dans le sud de la France.', 5, 1),
(10, 'Dromadaire', 'Mammifère à une seule bosse, adapté aux climats désertiques.', 5, 1),
(11, 'Ibis', 'Oiseau aux longues pattes et bec incurvé, souvent vu dans les zones humides.', 6, 1),
(12, 'Tortue', 'Reptile à carapace, connu pour sa lenteur et sa longévité.', 6, 1),
(13, 'Pécari', 'Un animal ressemblant à un sanglier, habitant les régions boisées.', 7, 1),
(14, 'Tamanoir', 'Fourmilier géant, connu pour son long museau et sa langue collante.', 8, 1),
(15, 'Nandou', 'Oiseau coureur d’Amérique du Sud, apparenté à l’autruche.', 8, 1),
(16, 'Flamant rose', 'Oiseau au plumage rose, souvent vu dans des eaux peu profondes sur une seule patte.', 8, 1),
(17, 'Émeu', 'Le deuxième plus grand oiseau vivant, originaire d’Australie.', 9, 1),
(18, 'Wallaby', 'Petit marsupial australien, ressemblant à un kangourou.', 9, 1),
(19, 'Porc-épic', 'Rongeur couvert de piquants défensifs.', 10, 1),
(20, 'Lynx', 'Félin sauvage aux oreilles touffues, habitant les régions forestières.', 11, 1),
(21, 'Serval', 'Félin africain de taille moyenne, reconnaissable par ses longues pattes et ses taches noires.', 12, 1),
(22, 'Chien des buissons', 'Petit carnivore social d’Amérique du Sud, souvent observé en groupes.', 13, 1),
(23, 'Tigre', 'Grand félin rayé, reconnu pour sa puissance et sa discrétion.', 14, 1),
(24, 'Macaque  rabier', 'Animal sans description spécifique.', 15, 2),
(25, 'Cerf', 'Grand herbivore, reconnaissable par ses bois majestueux.', 16, 2),
(26, 'Vautour', 'Oiseau charognard, souvent vu planer à la recherche de nourriture.', 17, 2),
(27, 'Antilope', 'Mammifère herbivore agile, vivant dans les savanes et les plaines.', 18, 2),
(28, 'Daim', 'Cerf de taille moyenne, souvent observé dans les parcs boisés.', 18, 2),
(29, 'Nilgaut', 'Grande antilope d’Asie, reconnaissable par son pelage gris.', 18, 2),
(30, 'Loup d\'Europe', 'Carnivore social, vivant en meutes dans les forêts européennes.', 19, 2),
(31, 'Loutre', 'Petit mammifère semi-aquatique, connu pour son jeu et son habileté à nager.', 20, 3),
(32, 'Binturong', 'Carnivore arboricole d’Asie, parfois appelé “chat-ours”.', 20, 3),
(33, 'Mouflon', 'Mouton sauvage, connu pour ses cornes enroulées.', 21, 3),
(34, 'Tortue', 'Reptile à carapace, connu pour sa lenteur et sa longévité.', 22, 3),
(35, 'Lémurien', 'Primate de Madagascar, connu pour ses grands yeux et sa queue annelée.', 23, 3),
(36, 'Chèvre naine', 'Petite chèvre, souvent gardée dans les fermes et zoos pour son caractère amical.', 24, 3),
(37, 'Panda roux', 'Petit mammifère arboricole, avec une fourrure rougeâtre.', 25, 3),
(38, 'Panthère', 'Félin élégant, souvent confondu avec le léopard.', 26, 3),
(39, 'Grand Hocco', 'Grand oiseau terrestre des forêts tropicales d’Amérique.', 27, 3),
(40, 'Ara Perroquet', 'Grand perroquet coloré des forêts tropicales.', 28, 3),
(41, 'Lion', 'Le roi des animaux, vivant en groupes appelés \"coalitions\".', 29, 4),
(42, 'Hippopotame', 'Grand mammifère semi-aquatique, habitant les rivières et lacs d’Afrique.', 30, 4),
(43, 'Zèbre', 'Équidé rayé, connu pour son pelage noir et blanc distinctif.', 31, 4),
(44, 'Hyène', 'Carnivore social d’Afrique, reconnu pour son rire distinctif.', 32, 4),
(45, 'Loup à crinière', 'Canidé au pelage rougeâtre, vivant en Amérique du Sud.', 33, 4),
(46, 'Girafe', 'Animal le plus grand du monde, au long cou et taches distinctives.', 34, 4),
(47, 'Éléphant', 'Le plus grand mammifère terrestre, avec une trompe distinctive.', 35, 4),
(48, 'Varan de Komodo', 'Le plus grand lézard vivant, capable de chasser des proies imposantes.', 36, 4),
(49, 'Grivet Cercopithèqu', 'Animal sans description spécifique.', 37, 4),
(50, 'Oustiti Gibbon', 'Petit singe au pelage doux, connu pour ses acrobaties.', 38, 4),
(51, 'Oustiti Gibbon', 'Petit singe au pelage doux, connu pour ses acrobaties.', 64, 4),
(52, 'Tamarin Capucin', 'Petit primate, souvent observé en groupes dans les forêts tropicales.', 39, 4),
(53, 'Tamarin Capucin', 'Petit primate, souvent observé en groupes dans les forêts tropicales.', 65, 4),
(54, 'Crocodile nain', 'Le plus petit des crocodiles, habitant les rivières tropicales.', 40, 5),
(55, 'Casoar', 'Oiseau coureur dangereux, reconnaissable par son casque sur la tête.', 41, 5),
(56, 'Guépard', 'Le mammifère terrestre le plus rapide, avec une silhouette élancée.', 42, 5),
(57, 'Gazelle', 'Antilope gracieuse, souvent vue bondissant dans les savanes.', 43, 5),
(58, 'Autruche', 'Le plus grand oiseau vivant, incapable de voler mais excellent coureur.', 43, 5),
(59, 'Tapir', 'Mammifère au long museau, vivant dans les forêts tropicales.', 44, 5),
(60, 'Gnou', 'Antilope robuste des plaines africaines, migratrice par nature.', 45, 5),
(61, 'Oryx beisa', 'Antilope aux longues cornes droites, adaptée aux environnements arides.', 45, 5),
(62, 'Rhinocéros', 'Grand mammifère avec une ou deux cornes sur le nez.', 45, 5),
(63, 'Suricate', 'Petit carnivore vivant en groupes dans les déserts africains.', 46, 5),
(64, 'Fennec', 'Renard des sables, connu pour ses grandes oreilles.', 47, 5),
(65, 'Coati', 'Petit mammifère au long museau, habitant les forêts d’Amérique centrale et du Sud.', 48, 5),
(66, 'Saïmiri', 'Petit singe, souvent appelé “singe écureuil”.', 49, 5),
(67, 'Tortue', 'Reptile à carapace, connu pour sa lenteur et sa longévité.', 50, 6),
(68, 'Python', 'Serpent constricteur de grande taille, souvent trouvé dans les forêts tropicales.', 50, 6),
(69, 'Iguane', 'Grand lézard herbivore, vivant dans des climats chauds.', 50, 6),
(70, 'Restaurant', 'Animal sans description spécifique.', 51, 4),
(71, 'Toillettes', 'Animal sans description spécifique.', 52, 4),
(72, 'Petit train', 'Animal sans description spécifique.', 53, 4),
(73, 'Petit train', 'Animal sans description spécifique.', 54, 3),
(74, 'Snack', 'Animal sans description spécifique.', 55, 3),
(75, 'Point d\'eau', 'Animal sans description spécifique.', 56, 3),
(76, 'Toillettes', 'Animal sans description spécifique.', 57, 1),
(77, 'Point d\'eau', 'Animal sans description spécifique.', 58, 1),
(78, 'Point d\'eau', 'Animal sans description spécifique.', 59, 1),
(79, 'Point d\'eau', 'Animal sans description spécifique.', 60, 4),
(80, 'Boutique', 'Animal sans description spécifique.', 61, 6),
(81, 'Toillettes', 'Animal sans description spécifique.', 62, 6),
(82, 'Restaurant', 'Animal sans description spécifique.', 63, 6),
(83, 'Café', 'Animal sans description spécifique.', 64, 6);

-- --------------------------------------------------------

--
-- Structure de la table `biomes`
--

DROP TABLE IF EXISTS `biomes`;
CREATE TABLE IF NOT EXISTS `biomes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `color_code` varchar(7) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `biomes`
--

INSERT INTO `biomes` (`id`, `name`, `color_code`, `description`) VALUES
(1, 'Les Clairières', '#F1DA4C', NULL),
(2, 'Le bois des pins', '#79C256', NULL),
(3, 'Le vallon des cascades', '#47AADE', NULL),
(4, 'Le plateau', '#F08328', NULL),
(5, 'Le belvédère', '#C2B8AF', NULL),
(6, 'La bergerie des reptiles', '#63C52B', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `enclosures`
--

DROP TABLE IF EXISTS `enclosures`;
CREATE TABLE IF NOT EXISTS `enclosures` (
  `enclosure_id` int NOT NULL AUTO_INCREMENT,
  `biome_id` int DEFAULT NULL,
  `position_x` float DEFAULT NULL,
  `position_y` float DEFAULT NULL,
  `neighbor_1_id` int DEFAULT NULL,
  `neighbor_2_id` int DEFAULT NULL,
  `distance_to_neighbor_1` float DEFAULT NULL,
  `distance_to_neighbor_2` float DEFAULT NULL,
  PRIMARY KEY (`enclosure_id`),
  KEY `biome_id` (`biome_id`),
  KEY `neighbor_1_id` (`neighbor_1_id`),
  KEY `neighbor_2_id` (`neighbor_2_id`)
) ENGINE=MyISAM AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `enclosures`
--

INSERT INTO `enclosures` (`enclosure_id`, `biome_id`, `position_x`, `position_y`, `neighbor_1_id`, `neighbor_2_id`, `distance_to_neighbor_1`, `distance_to_neighbor_2`) VALUES
(1, 1, 5.21003, 43.624, 30, 31, 50, 50),
(2, 1, 5.21066, 43.6235, 6, 7, 3, 9),
(3, 1, 5.21184, 43.6233, 2, 8, 62, 2),
(4, 1, 5.21395, 43.6226, 10, 5, 43, 32),
(5, 1, 5.2136, 43.6221, 4, 18, 32, 12),
(6, 1, 5.21055, 43.6232, 7, 33, 10, 22),
(7, 1, 5.21185, 43.6228, 6, 8, 12, 21),
(8, 1, 5.21185, 43.6228, 52, 13, 7, 5),
(9, 1, 5.21245, 43.6227, 8, 52, 73, 3),
(10, 1, 5.21278, 43.6228, 9, 4, 3, 50),
(11, 1, 5.20991, 43.623, 12, 33, 12, 63),
(12, 1, 5.21023, 43.6229, 11, 14, 12, 84),
(13, 1, 5.21099, 43.6228, 51, 8, 4, 6),
(14, 1, 5.21117, 43.6224, 17, 53, 4, 2),
(15, 2, 5.20973, 43.6225, 16, 20, 2, 92),
(16, 2, 5.20961, 43.6222, 15, 17, 2, 72),
(17, 2, 5.2108, 43.6221, 53, 16, 50, 72),
(18, 2, 5.21246, 43.622, 5, 19, 43, 7),
(19, 2, 5.21316, 43.6214, 18, 5, 7, 37),
(20, 3, 5.20904, 43.6231, 15, 34, 82, 112),
(21, 3, 5.20813, 43.623, 22, 56, 26, 38),
(22, 3, 5.20755, 43.623, 21, 55, 21, 17),
(23, 3, 5.20704, 43.6233, 24, 25, 3, 13),
(24, 3, 5.20683, 43.6231, 23, 25, 3, 13),
(25, 3, 5.20674, 43.6237, 23, 24, 13, 14),
(26, 3, 5.20557, 43.6261, 27, 28, 4, 13),
(27, 3, 5.20529, 43.6263, 26, 28, 4, 3),
(28, 3, 5.20515, 43.6264, 27, 26, 4, 12),
(29, 4, 5.20943, 43.6251, 30, 41, 17, 47),
(30, 4, 5.20987, 43.6246, 29, 31, 17, 7),
(31, 4, 5.20934, 43.6243, 32, 1, 42, 49),
(32, 4, 5.20868, 43.6242, 34, 35, 13, 18),
(33, 4, 5.20926, 43.6235, 34, 6, 62, 70),
(34, 4, 5.20793, 43.6239, 32, 20, 5, 22),
(35, 4, 5.20753, 43.6242, 36, 34, 24, 3),
(36, 4, 5.20721, 43.6244, 51, 37, 7, 8),
(37, 4, 5.20699, 43.6243, 36, 54, 8, 10),
(38, 4, 5.20678, 43.6247, 51, 39, 6, 4),
(64, 4, 5.20682, 43.6247, 62, 50, 5, 10),
(39, 4, 5.20673, 43.6249, 38, 51, 4, 11),
(40, 5, 5.20933, 43.6256, 41, 42, 12, 10),
(41, 5, 5.20894, 43.6255, 44, 40, 9, 14),
(42, 5, 5.20897, 43.626, 43, 40, 22, 34),
(43, 5, 5.20846, 43.6261, 42, 45, 21, 44),
(44, 5, 5.20835, 43.6253, 41, 49, 26, 32),
(45, 5, 5.20681, 43.6261, 43, 46, 72, 56),
(46, 5, 5.20684, 43.6257, 45, 47, 8, 6),
(47, 5, 5.20694, 43.6258, 46, 48, 7, 7),
(48, 5, 5.2073, 43.6258, 47, 44, 5, 20),
(49, 5, 5.20755, 43.6256, 47, 44, 5, 20),
(50, 6, 5.20422, 43.6261, 55, 56, 1, 3),
(51, 4, 5.20661, 43.6243, 38, 36, 10, 9),
(52, 4, 5.2064, 43.6251, 38, 39, 12, 8),
(53, 4, 5.20786, 43.625, 35, 32, 23, 35),
(54, 3, 5.20514, 43.6261, 27, 28, 10, 10),
(55, 3, 5.20738, 43.6229, 22, 23, 3, 14),
(56, 3, 5.20824, 43.6227, 21, 22, 7, 14),
(57, 1, 5.21058, 43.6229, 7, 13, 3, 4),
(58, 1, 5.21209, 43.6225, 8, 9, 3, 1),
(59, 1, 5.21118, 43.6221, 14, 17, 2, 8),
(60, 4, 5.20772, 43.6236, 34, 37, 6, 34),
(61, 6, 5.20436, 43.6261, 62, 63, 10, 10),
(62, 6, 5.20408, 43.6259, 61, 63, 20, 10),
(63, 6, 5.20472, 43.6258, 61, 62, 10, 20);

-- --------------------------------------------------------

--
-- Structure de la table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `enclosure_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` tinyint DEFAULT NULL,
  `comment` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `enclosure_id` (`enclosure_id`),
  KEY `user_id` (`user_id`)
) ;

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `location` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `num_tickets` int NOT NULL,
  `visit_date` date NOT NULL,
  `purchased_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `created_at`) VALUES
(1, 'abdulabdel', '$2y$10$WLpc/0W/.yA27P7AZ5HIrua2ge8Be.2/d4vzZjL2avPIPo9trYf3W', 'abdul.abdel@alKida.bomb', 'user', '2024-11-22 10:29:23');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
