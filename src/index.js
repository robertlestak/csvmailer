require('dotenv').config()
const Mail = require('./class/Mail')
const Emails = require('./class/Emails')
const Log = require('./class/Log')
const program = require('commander')
const fs = require('fs')
const path = require('path')
const dataPath = require('./config/data')()

async function main () {
  program
    .version(require('../package.json').version)
    .option('-c, --campaign [name]', 'Name of campaign [default]', 'default')
    .option('-e, --email [name]', 'Name of HTML email file [email.html]', 'email.html')
    .option('-f, --file [name]', 'Name of CSV emails file [emails.csv]', 'emails.csv')
    .option('-l, --log', 'View campaign log')
    .option('-m, --mail', 'Start mail process')
    .option('-s, --subject [subject]', 'Subject of email [Newsletter]', 'Newsletter')
    .parse(process.argv)

    if (program.mail) {
      const emails = new Emails(program.file)
      const mail = new Mail(program.campaign)
      mail.email.subject = program.subject
      try {
        mail.email.html = fs.readFileSync(path.join(dataPath, program.email)).toString()
        let emailArray = await emails.parse()
        mail.emails = emailArray
        let response = await mail.sendList()
        console.log(response)
        process.exit()
      } catch (e) {
        console.log(e)
      }
    } else if (program.log){
      const log = new Log(program.campaign)
      log.list()
        .then(response => console.log(response))
        .catch(error => console.log(error))
    } else {
      program.help()
    }
  }
  main()
