import { Router } from "express";
import { searchRadar } from "../services/radar/search";

const router = Router();

router.get("/radar/search", async (req, res) => {
  const bairro = String(req.query.bairro ?? "");

  if (!bairro) {
    return res.status(400).json({
      erro: "Informe o bairro.",
    });
  }

  const resultado = await searchRadar({ bairro });

  return res.json(resultado);
});

export default router;