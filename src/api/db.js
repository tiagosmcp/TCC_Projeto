import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "mainline.proxy.rlwy.net", 
  port: 28212,                  
  user: "root",                    
  password: "ncmnVtQIjwvMZVaKitUrBlxcNUtsgykf",    
  database: "ipb_alvorada",           
});


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
