import { Router } from "express";
import SchemaController from "../controllers/schema";

const router = Router();

router.post("/", SchemaController.registerSchema);

router.put("/", (req, res) => {
  res.json({ message: "Method not allowed" });
})

router.get("/", SchemaController.getSchemaList);

router.get("/:schemaId", SchemaController.getSchemaById);

// Delete
router.delete("/", (req, res) => {
  res.json({ message: "Method not allowed" });
});

export default router;
