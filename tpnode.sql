-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Usuarios` (
  `idUsuarios` INT NOT NULL AUTO_INCREMENT,
  `nombreUsuario` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUsuarios`))
ENGINE = InnoDB;


-- Insert data into Usuarios
INSERT INTO `mydb`.`Usuarios` (`nombreUsuario`, `password`) VALUES
('usuario1', 'password1'),
('usuario2', 'password2'),
('usuario3', 'password3');

-- -----------------------------------------------------
-- Table `mydb`.`Genero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Genero` (
  `idGenero` INT NOT NULL AUTO_INCREMENT,
  `genero` VARCHAR(45) NULL,
  PRIMARY KEY (`idGenero`))
ENGINE = InnoDB;

-- Insert data into Genero
INSERT INTO `mydb`.`Genero` (`genero`) VALUES
('Ficción'),
('No Ficción'),
('Ciencia'),
('Historia');


-- -----------------------------------------------------
-- Table `mydb`.`Libro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Libro` (
  `idLibro` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `genero` VARCHAR(45) NOT NULL,
  `editorial` VARCHAR(45) NOT NULL,
  `precio` FLOAT(40) NOT NULL,
  `Genero_idGenero` INT NOT NULL,
  PRIMARY KEY (`idLibro`),
  INDEX `fk_Libro_Genero_idx` (`Genero_idGenero` ASC),
  CONSTRAINT `fk_Libro_Genero`
    FOREIGN KEY (`Genero_idGenero`)
    REFERENCES `mydb`.`Genero` (`idGenero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- Insert data into Libro
INSERT INTO `mydb`.`Libro` (`nombre`, `genero`, `editorial`, `precio`, `Genero_idGenero`) VALUES
('Libro1', 'Ficción', 'Editorial1', 19.99, 1),
('Libro2', 'No Ficción', 'Editorial2', 29.99, 2),
('Libro3', 'Ciencia', 'Editorial3', 39.99, 3),
('Libro4', 'Historia', 'Editorial4', 24.99, 4);

-- -----------------------------------------------------
-- Table `mydb`.`Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Pedido` (
  `idPedido` INT NOT NULL AUTO_INCREMENT,
  `cantidadProductos` VARCHAR(45) NULL,
  `precioTotal` FLOAT NOT NULL,
  `fechaPedido` DATETIME(6) NOT NULL,
  `entregado` BOOLEAN NOT NULL,
  PRIMARY KEY (`idPedido`))
ENGINE = InnoDB;

-- Insert data into Pedido
INSERT INTO `mydb`.`Pedido` (`cantidadProductos`, `precioTotal`, `fechaPedido`, `entregado`) VALUES
('3', 59.97, '2023-07-01 12:34:56', 0),
('2', 49.98, '2023-07-02 13:45:00', 1),
('1', 39.99, '2023-07-03 14:50:30', 0);
-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `permisos` INT(10) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Pedido_idPedido` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_user_Pedido1_idx` (`Pedido_idPedido` ASC) ,
  CONSTRAINT `fk_user_Pedido1`
    FOREIGN KEY (`Pedido_idPedido`)
    REFERENCES `mydb`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-- Insert data into user
INSERT INTO `mydb`.`user` (`username`, `email`, `password`, `permisos`, `Pedido_idPedido`) VALUES
('user1', 'user1@example.com', 'pass1', 1, 1),
('user2', 'user2@example.com', 'pass2', 2, 2),
('user3', 'user3@example.com', 'pass3', 1, 3);

-- -----------------------------------------------------
-- Table `mydb`.`Libro_has_Pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Libro_has_Pedido` (
  `Libro_idLibro` INT NOT NULL,
  `Pedido_idPedido` INT NOT NULL,
  PRIMARY KEY (`Libro_idLibro`, `Pedido_idPedido`),
  INDEX `fk_Libro_has_Pedido_Pedido1_idx` (`Pedido_idPedido` ASC) ,
  INDEX `fk_Libro_has_Pedido_Libro1_idx` (`Libro_idLibro` ASC) ,
  CONSTRAINT `fk_Libro_has_Pedido_Libro1`
    FOREIGN KEY (`Libro_idLibro`)
    REFERENCES `mydb`.`Libro` (`idLibro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Libro_has_Pedido_Pedido1`
    FOREIGN KEY (`Pedido_idPedido`)
    REFERENCES `mydb`.`Pedido` (`idPedido`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



