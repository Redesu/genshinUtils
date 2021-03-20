const users = require('./users.json') || []
const fs = require('fs')
class JsonUtil {
    static writeOnJson() {
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
  module.exports = JsonUtil;