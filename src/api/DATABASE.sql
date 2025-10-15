
CREATE DATABASE ipb_alvorada;
USE ipb_alvorada;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE, -- 'UNIQUE' para garantir que seja nome de usuario unico
    email VARCHAR(255),
    fone VARCHAR(20),
    data_nascimento DATE,
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

-- 3. Insere os Administradores Fixos com códigos Hex
-- usar um hash forte (bcrypt) para a senha!
INSERT INTO usuarios (nome, senha, cor, tipo) VALUES 
('AdminUCP', '123', '#007bff', 'UCP'),
('AdminUPA', '123', '#fd7e14', 'UPA'),
('AdminUMP', '123', '#28a745', 'UMP'),
('AdminSAF' , '123', '#ca3cb7ff', 'SAF'),
('AdminUPH' , '123', '#6c757d', 'UPH')
ON DUPLICATE KEY UPDATE nome=VALUES(nome);


