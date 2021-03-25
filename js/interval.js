const config = require('../config.json')
const SaveManager = require('./jsonUtil.js')
const saveManager = new SaveManager()
const channelData = require('../channels.json')
const time = config.time * 60 * 1000
module.exports = class Interval {
    interval(users, client) {
        setInterval(_ => {
            for (const user of users) {
                if (user.resina < 160) {
                    ++user.resina
                    if (user.resina === 80 || user.resina === 140 || user.resina === 145 || user.resina === 155) {
                        const channelId = channelData.channel
                        client._client.channels.fetch(channelId).then(channel => {
                            channel.send(`<@${user.id}> sua resina está quase enchendo!`)
                        })
                    }
                }
            }
            saveManager.writeOnJson()
        }, time)
    }
}