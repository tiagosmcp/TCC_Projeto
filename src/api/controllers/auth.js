import { db } from "../db.js";
import bcrypt from "bcryptjs";

// LOGIN
export const login = (req, res) => {
    const { nome, senha } = req.body;

    const q = "SELECT * FROM usuarios WHERE nome = ?";
    db.query(q, [nome], (err, data) => {
        if (err) {
            console.error("Erro na consulta de login:", err);
            return res.status(500).json("Erro no servidor ao buscar usuário.");
        }
        if (data.length === 0) return res.status(401).json("Usuário não encontrado.");

        const user = data[0];

        // comparar a senha digitada com o hash armazenado
        const senhaCorreta = bcrypt.compareSync(senha, user.senha);
        if (!senhaCorreta) return res.status(401).json("Senha incorreta.");

        const { senha: _, ...other } = user;
        return res.status(200).json(other);
    });
};