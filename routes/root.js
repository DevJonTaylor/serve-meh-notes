import { Router } from "express";

const router = Router();

router.get('/notes', (req, res) => {
  res.sendHtml('notes');
})

router.get('*', (req, res) => {
  res.sendHtml('index');
})

export default router;