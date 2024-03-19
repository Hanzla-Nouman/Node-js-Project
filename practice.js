const fs = require("fs");
const path = require("path");

function organizeFiles(folderName) {
  fs.readdir(folderName, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    console.log("here you go "+files)
    const filesByExtension = {};
    files.forEach((fileName) => {
      const fileExtension = path.extname(fileName);

      const extensionFolder = path.join(folderName, fileExtension);
      if (!fs.existsSync(extensionFolder)) {
        fs.mkdirSync(extensionFolder);
      }

      const sourceFilePath = path.join(folderName, fileName);
      const destinationFilePath = path.join(extensionFolder, fileName);
      fs.renameSync(sourceFilePath, destinationFilePath);

      if (!filesByExtension[fileExtension]) {
        filesByExtension[fileExtension] = [];
      }
      filesByExtension[fileExtension].push(destinationFilePath);
    });

    console.log("Files organized successfully.");
    console.log("Files by extension:", filesByExtension);
  });
}

organizeFiles("./public");
