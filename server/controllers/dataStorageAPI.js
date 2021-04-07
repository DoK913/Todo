const fileStorage = require("fs");

const path = "./data/todos.json";

function readFile() {
  return new Promise((resolve, reject) => {
    fileStorage.readFile(path, function read(err, data) {
      if (err) {
        reject(err);
      }
      console.log(data);
      const content = JSON.parse(data);
      resolve(content);
    });
  });
}

function rewriteFile(data) {
  return new Promise((resolve, reject) => {
    fileStorage.unlink(path, function (err) {
      if (err) {
        reject(err);
      }

      const json = JSON.stringify(data);
      fileStorage.writeFile(path, json, function (err) {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  });
}

module.exports = {
  readFile: readFile,
  rewriteFile: rewriteFile,
};
