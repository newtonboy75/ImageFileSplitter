import express from "express";
import multer from "multer";
import fs from "fs";
import { splitImage } from "../utils/image_splitter";

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
  router.post(
    "/upload_files",
    upload.single("file"),
    async (req: express.Request, res: express.Response) => {
      res.json("File Uploaded successfully");
    }
  );

  //get list of files
  router.get(
    "/get_file",
    async (req: express.Request, res: express.Response) => {
      const { file_name, rows, columns } = req.query;

      //get grid size
      let gridSize =
        parseInt(rows.toString()) * parseInt(columns.toString()) * 1000;

      const data = {
        filename: file_name,
        rows: rows,
        columns: columns,
      };

      /**
       * find file and get file size
       * calculate seconds based on file size and numbers of
       * rows and columns
       */
      const fStats = fs.statSync("uploads/" + file_name);
      let seconds = 0
      let fileSize = Math.floor(fStats.size / 1000);
      
      if (fileSize <= 1000) {
        seconds = 1000;
      } else {
        seconds = (fileSize + gridSize);
      }

      //start processing file and return results
      const splittedImages = await splitImage(data).then((result) => {
        setTimeout(function () {
          res.send(result);
        }, seconds);
      });
    }
  );
};
