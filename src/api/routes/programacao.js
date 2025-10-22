import express from "express";
import { addProgramacao, deleteProgramacao, getProgramacoes, updateProgramacao } from "../controllers/programacao.js";

const router = express.Router();

router.get("/", getProgramacoes);
router.post("/", addProgramacao);
router.put("/:id", updateProgramacao);
router.delete("/:id", deleteProgramacao);



export default router;