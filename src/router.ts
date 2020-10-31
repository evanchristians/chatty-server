import { Router } from "express";

const router = Router().get("/", ({ res }) => {
  res?.send("server is running");
});

export default router;
