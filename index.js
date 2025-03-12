import dotenv from 'dotenv'
dotenv.config()

const FIVE_MINUTES = 1000 * 60 * 5

const { NETHELY_URL } = process.env

const formatter = new Intl.DateTimeFormat('en-US', {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

setInterval(async () => {
  const response = await fetch(NETHELY_URL)
  const date = new Date()

  if (!response.ok) {
    console.error(`[${formatter.format(date)}] - Error while updating ddns record`)
  } else {
    console.log(`[${formatter.format(date)}] - Update OK`)
  }
}, FIVE_MINUTES)
