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


UPDATE usuarios SET senha = '$2b$10$iKYXWkI/vDpxlZxE1430mOkvqs3sNWGl4BQtD4EYnQC7NI/12IfSi' WHERE nome = 'AdminUCP';
UPDATE usuarios SET senha = '$2b$10$/OlaCcL4GEhn31zviQtSPecY6jeP4AXPnaVbddrOdmiSHMjeMOI6O' WHERE nome = 'AdminUPA';
UPDATE usuarios SET senha = '$2b$10$7Pwm7v3K.yEffCpQd0xELu7Y6m2pvHw29xKJRDvQ3pR7KtAmiKqBS' WHERE nome = 'AdminUMP';
UPDATE usuarios SET senha = '$2b$10$KpFEsCZQmgSG28mfv3vRR.QiGsnOLbL3wmgB.GJR5T9/C6c7mSTvm' WHERE nome = 'AdminSAF';
UPDATE usuarios SET senha = '$2b$10$q1yzL7XSlY5C1odtnRfVs.eQvi.rqfGHazIlI1DPZ4BhFI2J9zXZS' WHERE nome = 'AdminUPH';

