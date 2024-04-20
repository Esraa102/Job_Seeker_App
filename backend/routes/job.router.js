import express from "express";

const router = express.Router();

router.post("/create-job");
router.put("/update-job/:id");
router.delete("/delete-job/:id");

router.get("/all-jobs");
router.get("/job/:id");

export { router as jobRouter };
