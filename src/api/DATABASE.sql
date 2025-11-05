CREATE DATABASE ipb_alvorada;
USE ipb_alvorada;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    cor VARCHAR(50) NOT NULL,
    tipo VARCHAR(50) NOT NULL
);

CREATE TABLE programacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL,
    local VARCHAR(255),
    status VARCHAR(50),
    cor VARCHAR(50),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

INSERT INTO usuarios (nome, senha, cor, tipo) VALUES 
('AdminUCP', 'Ucp01/', '#007bff', 'UCP'),
('AdminUPA', 'Upa01/', '#fd7e14', 'UPA'),
('AdminUMP', 'Ump01/', '#28a745', 'UMP'),
('AdminSAF' , 'Saf01/', '#ca3cb7ff', 'SAF'),
('AdminUPH' , 'Uph01/', '#6c757d', 'UPH')
ON DUPLICATE KEY UPDATE nome=VALUES(nome);

