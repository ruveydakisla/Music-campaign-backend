import express from "express";
import campaignController from "./controllers/campaignController";

const app = express();
app.use(express.json());

app.use("/api/campaigns", campaignController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on :${PORT} `);
});
