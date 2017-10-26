require('dotenv').config()
const nodemailer = require('nodemailer')
const validator = require('validator')
const mailconfig = require('../config/mail')
const Log = require('./Log')

class Mail {
  constructor (campaign, emails, email) {
    this.campaign = campaign
    this.emails = emails
    this.email = email || {}
    this._init()
  }

  _init () {
    this.email.from = process.env.MAIL_FROM
  }

  _timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }

  sendEmail () {
    return new Promise((resolve, reject) => {
      if (!validator.isEmail(this.email.to)) {
        return reject('Valid Email Required')
      }
      console.log('Send email', this.email.to)
      if (mailconfig.service) {
        delete mailconfig.host
        delete mailconfig.port
      }
        const transporter = nodemailer.createTransport(mailconfig)
        transporter.sendMail(this.email, async (error, info) => {
          if (error) {
            try {
              await new Log(this.campaign, this.email.to, 'ERROR: ' + error.message).append()
            } catch (e) {
              console.log(e)
            }
            return reject(error)
          }
          try {
            await new Log(this.campaign, this.email.to, 'SUCCESS').append()
            resolve(info)
          } catch (e) {
            return reject(e)
          }
        })
    })
  }

  sendList () {
    return new Promise(async (resolve, reject) => {
      console.log('Send email list:', this.emails.length, 'emails')
      if (!this.emails) return reject('Email list required')
      for (var i = 0; i < this.emails.length; i++) {
        this.email.to = this.emails[i][0]
        try {
          const hasSent = await new Log(this.campaign, this.email.to).emailExists()
          if (!hasSent) {
            await this._timeout(process.env.MAIL_INTERVAL * 1000)
            const response = await this.sendEmail()
          }
        } catch (e) {
          console.log(e.message)
        }
      }
      resolve(this.campaign + ': Sending Complete')
    })
  }

}

module.exports = Mail
