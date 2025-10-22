import { db } from "../db.js";

// Lida com a requisição POST /auth/login
export const login = (req, res) => {
    // 1. Obtém o nome e a senha do corpo da requisição
    const { nome, senha } = req.body; 

    // Busca o usuário pelo nome
    const q = "SELECT * FROM usuarios WHERE nome = ?";
    
    db.query(q, [nome], (err, data) => {
        if (err) {
            console.error("Erro na consulta de login:", err);
            return res.status(500).json("Erro no servidor ao buscar usuário.");
        }
        if (data.length === 0) return res.status(401).json("Usuário não encontrado.");

        const user = data[0];

        if (user.senha !== senha) {
            return res.status(401).json("Senha incorreta.");
        }

        const { senha: _, ...other } = user; 
        
        return res.status(200).json(other);
    });
};