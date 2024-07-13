import express from "express";
import multer from "multer";
import fs from "fs";
import { splitImage } from "../utils/image-splitter";

export default (router: express.Router) => {
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, "uploads/");
    },
    filename: function (_req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });

  //endpoint to upload files
  router.post("/upload_files", upload.single("file"), async (req, res) => {
    res.json("File Uploaded successfully");
  });
  //process image file
  router.get("/split_file", async (req, res) => {
    const { file_name, rows, columns } = req.query;

    const data = {
      filename: file_name,
      rows: rows,
      columns: columns,
    };

    const splittedImages = await splitImage(data).then((result) => result);
    res.json("Files uploaded");
  });

  //get list of files
  router.get("/get_file", async (req, res) => {
    const { file_name } = req.query;

    const directory_name = `public/${file_name
      .toString()
      .trim()
      .replace(/[^a-z0-9]+/gi, "_")}`;

    const files = fs.readdirSync(directory_name).map((fileName) => {
      return directory_name.replace("public", "") + "/" + fileName;
    });

    setTimeout(function () {
      res.send(files);
    }, 6000);
  });
};
