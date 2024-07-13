import express from "express";
import cors from "cors";
import router from "./router";

const PORT = 5000;
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));

app.listen(PORT, () => {
  console.log(`hello express listening to port ${PORT}`);
});

app.use("/", router());
