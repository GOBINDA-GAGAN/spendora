import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createTransaction,
  getAllTransactions,
} from "../controller/tranasaction.controller.js";

const transactionRoute = express.Router();

transactionRoute.post("/create", authMiddleware, createTransaction);
transactionRoute.get("/", authMiddleware, getAllTransactions);

export default transactionRoute;
