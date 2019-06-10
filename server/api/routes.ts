import { Router } from "express";
import { searchMal } from "./search";
const router = Router();

router.get("/mal/search/:anime", (req, res) => {
  const { anime } = req.params;
  const results = searchMal(anime);
  res.send(results);
});

export default router;
