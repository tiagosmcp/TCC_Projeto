import express from "express";
import programacaoRoutes from "./routes/programacao.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";

const app = express();

app.use(express.json());

// Configuração de CORS para permitir o front na vercel
app.use(
    cors({
        origin: "https://ipbalvorada.vercel.app",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Necessário se você usar cookies/sessões (boas práticas)
    })
);

app.use("/programacao", programacaoRoutes);
app.use("/auth", authRoutes);

app.listen(8800, () => console.log("Servidor rodando na porta 8800"));
