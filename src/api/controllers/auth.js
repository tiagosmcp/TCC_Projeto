import { db } from "../db.js";

// Lida com a requisição POST /auth/login
export const login = (req, res) => {
    const { nome, senha } = req.body;

    // Busca o usuário pelo nome
    const q = "SELECT * FROM usuarios WHERE nome = ?";
    
    db.query(q, [nome], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(401).json("Usuário não encontrado.");

        const user = data[0];

        // Comparação de senha (ATENÇÃO: Mantenha a nota sobre HASH em produção)
        if (user.senha !== senha) {
            return res.status(401).json("Senha incorreta.");
        }

        // Sucesso: Retorna os dados do usuário (ID, nome, cor, tipo)
        const { senha, ...other } = user; // Remove a senha do objeto de retorno
        return res.status(200).json(other);
    });
};