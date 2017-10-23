require('dotenv').config()
const Mail = require('../src/class/Mail')
const Emails = require('../src/class/Emails')
const fs = require('fs')
const path = require('path')
const dataPath = require('../src/config/data')()
const assert = require('assert')
module.exports = (async () => {
  try {
    const emails = new Emails('test.csv')
    const mail = new Mail('test')
    mail.email.subject = 'test'
    mail.email.html = fs.readFileSync(path.join(dataPath, 'test.html')).toString()
    let emailArray = await emails.parse()
    assert(emailArray.length > 0)
    mail.emails = emailArray
    let response = await mail.sendList()
    console.log(response)
    assert(response.indexOf('Sending Complete') !== -1)
  } catch (e) {
    console.log(e)
  }
})()
