import { db } from "../db.js";

// (getProgramacoes continua a mesma, pois todos podem visualizar)
export const getProgramacoes = (req, res) => {
    const q = `
      SELECT 
          p.*, 
          u.nome as usuario_nome, 
          u.cor as usuario_cor,
          u.tipo as usuario_tipo
      FROM programacao p
      LEFT JOIN usuarios u ON p.id_usuario = u.id
      ORDER BY p.start DESC
    `;
    // ... (restante da função)
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        const programacoes = data.map(prog => ({
            ...prog,
            // ATENÇÃO: A cor e o tipo (status) agora virão do DB da Programação se não houver JOIN
            color: prog.cor, 
            tipo: prog.status,
            start: new Date(prog.start),
            end: new Date(prog.end),
        }));
        return res.status(200).json(programacoes);
    });
};

// INSERT (Adiciona e injeta cor e tipo do usuário)
export const addProgramacao = (req, res) => {
    // id_usuario_logado deve vir do corpo da requisição do frontend
    const { title, start, end, local, id_usuario_logado } = req.body;
    
    if (!id_usuario_logado) {
        return res.status(401).json("ID do Admin é necessário para criar uma programação.");
    }
    
    // 1. Busca os atributos (cor e tipo) do Admin logado
    const qUser = "SELECT cor, tipo FROM usuarios WHERE id = ?";

    db.query(qUser, [id_usuario_logado], (errUser, dataUser) => {
        if (errUser) return res.status(500).json(errUser);
        if (dataUser.length === 0) return res.status(404).json("Admin criador não encontrado.");

        const { cor, tipo } = dataUser[0];

        // 2. Insere a programação com os atributos injetados
        const q =
            "INSERT INTO programacao(`title`, `start`, `end`, `local`, `status`, `cor`, `id_usuario`) VALUES(?)";

        const values = [
            title,
            start,
            end,
            local,
            tipo, // O campo STATUS na tabela será o TIPO de programação (UCP, UPA...)
            cor,  // O campo COR na tabela será a cor do Admin
            id_usuario_logado,
        ];

        db.query(q, [values], (err) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json("Programação criada com sucesso.");
        });
    });
};

// UPDATE (SÓ pode atualizar se for o criador)
export const updateProgramacao = (req, res) => {
    const { id_usuario_logado } = req.body;
    const programacaoId = req.params.id;
    
    if (!id_usuario_logado) {
        return res.status(401).json("ID do Admin é necessário para atualizar.");
    }

    // 1. Verifica se o Admin logado é o criador da programação
    const qCheck = "SELECT id_usuario FROM programacao WHERE id = ?";
    
    db.query(qCheck, [programacaoId], (errCheck, dataCheck) => {
        if (errCheck) return res.status(500).json(errCheck);
        if (dataCheck.length === 0) return res.status(404).json("Programação não encontrada.");

        const criadorId = dataCheck[0].id_usuario;

        // Regra de Permissão: SÓ pode Editar o que ele mesmo adicionou
        if (criadorId !== id_usuario_logado) {
            return res.status(403).json("Você só pode editar programações que você mesmo criou.");
        }
        
        // 2. Busca os dados (cor e tipo) do criador (para garantir a consistência)
        const qUser = "SELECT cor, tipo FROM usuarios WHERE id = ?";

        db.query(qUser, [id_usuario_logado], (errUser, dataUser) => {
            if (errUser) return res.status(500).json(errUser);
            const { cor, tipo } = dataUser[0];

            // 3. Atualiza a programação
            const q =
                "UPDATE programacao SET `title` = ?, `start` = ?, `end` = ?, `local` = ?, `status` = ?, `cor` = ?, `id_usuario` = ? WHERE `id` = ?";

            const values = [
                req.body.title,
                req.body.start,
                req.body.end,
                req.body.local,
                tipo,
                cor, 
                id_usuario_logado, // Mantém o vínculo e os atributos
            ];

            db.query(q, [...values, programacaoId], (err) => {
                if (err) return res.status(500).json(err);
                return res.status(200).json("Programação atualizada com sucesso.");
            });
        });
    });
};

// DELETE (SÓ pode deletar se for o criador)
export const deleteProgramacao = (req, res) => {
    // id_usuario_logado vem no body da requisição DELETE (ver Frontend)
    const { id_usuario_logado } = req.body; 
    const programacaoId = req.params.id;
    
    if (!id_usuario_logado) {
        return res.status(401).json("ID do Admin é necessário para deletar.");
    }

    // 1. Verifica se o Admin logado é o criador
    const qCheck = "SELECT id_usuario FROM programacao WHERE id = ?";
    
    db.query(qCheck, [programacaoId], (errCheck, dataCheck) => {
        if (errCheck) return res.status(500).json(errCheck);
        if (dataCheck.length === 0) return res.status(404).json("Programação não encontrada.");

        const criadorId = dataCheck[0].id_usuario;

        // Regra de Permissão: SÓ pode Deletar o que ele mesmo adicionou
        if (criadorId !== id_usuario_logado) {
            return res.status(403).json("Você só pode deletar programações que você mesmo criou.");
        }
        
        // 2. Se for o criador, deleta
        const q = "DELETE FROM programacao WHERE `id` = ?";

        db.query(q, [programacaoId], (err) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Programação deletada com sucesso.");
        });
    });
};