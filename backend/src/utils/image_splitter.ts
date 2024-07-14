import sharp from "sharp";
import fs from "fs";

export const splitImage = async (data: {
  filename: any;
  rows: any;
  columns: any;
}) => {
  const { filename, rows, columns } = data;
  const input = "uploads/" + filename;
  const destinationFolderName = filename.replace(/[^a-z0-9]+/gi, "_");
  const fileExtension = filename.substr(filename.lastIndexOf(".") + 1);
  const destinationFolder = "public/" + destinationFolderName;

  try {
    if (!fs.existsSync(destinationFolder)) {
      fs.mkdirSync(destinationFolder);
    } else {
      fs.rmSync(destinationFolder, { recursive: true });
      fs.mkdirSync(destinationFolder);
    }
  } catch (err) {
    console.error(err);
  }

  const sharpenImage = sharp(input)
    .metadata()
    .then(async (metadata) => {
      const splitHeight = Math.floor(metadata.height / rows);
      const splitWidth = Math.floor(metadata.width / columns);
      let counter = 1;
      let splittedImages: string[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          const x = row * splitHeight;
          const y = col * splitWidth;
          const output_name = `public/${destinationFolderName}/${destinationFolderName}_${counter}.${fileExtension}`;

          counter++;

          await sharp(input, { animated: true })
            .extract({
              left: y,
              top: x,
              width: splitWidth,
              height: splitHeight,
            })
            //.webp({ quality: 80 })
            .toFile(output_name, function (err) {});

          splittedImages.push(output_name.replace("public", ""));
        }
      }

      return splittedImages;
    });

  let result = await sharpenImage;
  return result;
};
