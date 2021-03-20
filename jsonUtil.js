const users = require('./users.json') || []
const fs = require('fs')
module.exports = class SaveManager {
    writeOnJson() {
    const dataUsers = JSON.stringify(users)
      fs.writeFile('./users.json', dataUsers, 'utf8', (err) => {
          if (err) {
              console.log(`Error writing file: ${err}`);
          } else {
              console.log(`File is written successfully!`);
          }
      })
    }
  }