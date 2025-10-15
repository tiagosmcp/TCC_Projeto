import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "ipb_alvorada",
});

// ... (restante do código)
// NOVO: Adiciona a verificação de erro para garantir que a conexão funcione
db.connect((err) => {
    if (err) {
        console.error("❌ ERRO AO CONECTAR AO MYSQL: ", err.stack);
        console.log(
            "Certifique-se de que o servidor MySQL está rodando e que as credenciais em db.js estão corretas."
        );
        // Força a saída do processo se a conexão falhar
        process.exit(1);
    }
    console.log("✅ Conexão MySQL estabelecida com ID: " + db.threadId);
});
