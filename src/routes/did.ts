import { Router } from "express";
import DidController from "../controllers/did";

const router = Router();

router.post("/", DidController.registerDID);

router.get("/", DidController.getDIDList);

router.get("/:did", DidController.resolveDID);

// Delete
router.delete("/", (req, res) => {
  res.json({ message: "Method not allowed" });
});

export default router;
