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
    const { file_name, rows, columns } = req.query;

    //calculate seconds based on file size and number of grids
    let seconds =
      1000 + (parseInt(rows.toString()) + parseInt(columns.toString()) * 1000);

    //get file size and base timer seconds of filesize
    fs.stat("uploads/" + file_name, (err, stats) => {
      if (err) {
        console.error(err);
      } else {
        let fileSize = Math.floor(stats.size / 1000);
        if (fileSize < 1000) {
          seconds = 1000;
        } else if (fileSize >= 1000 && fileSize < 5000) {
          seconds = 2000;
        } else if (fileSize >= 5000 && fileSize <= 8000) {
          seconds = 3000;
        } else if (fileSize >= 8000 && fileSize <= 10000) {
          seconds = 6000;
        } else {
          seconds = 10000;
        }
      }
    });

    const directory_name = `public/${file_name
      .toString()
      .trim()
      .replace(/[^a-z0-9]+/gi, "_")}`;

    const files = fs.readdirSync(directory_name).map((fileName) => {
      return directory_name.replace("public", "") + "/" + fileName;
    });

    //reaarange files by file number
    let filesArr = [];
      for (let i = 0; i <= files.length; i++) {
        let pattern = "_" + i + ".";
        for (let j = 0; j < files.length; j++) {
          if (files[j].includes(pattern)) {
            filesArr.push(files[j]);
          }
        }
      }

    setTimeout(function () {
      res.send(filesArr);
    }, seconds);
  });
};
