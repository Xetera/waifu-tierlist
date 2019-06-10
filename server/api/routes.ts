import { Router } from "express";
import { search } from "./search";
const router = Router();

router.get("/mal/search/:anime", (req, res) => {
  const { anime } = req.params;
  const results = search(anime);
  res.send(results);
});

export default router;
