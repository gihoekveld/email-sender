import express from 'express'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.post('/send-email', async (req, res) => {
  const { from, to, subject, html } = req.body

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true para 465, false para outras portas
  })

  try {
    const result = await transporter.sendMail({ from, to, subject, html })

    console.log('Email Sent ID:', result.messageId)

    res.status(200).send({ success: true })
  } catch (err) {
    console.log('Error sending email:', err)

    res.status(500).send({ error: 'Error sending email', details: err })
  }
})

app.listen(3003, () => {
  console.log('Email server listening on port 3003')
})
