import dotenv from 'dotenv'
dotenv.config()

const FIVE_MINUTES = 1000 * 60 * 5

const {
  NETHELY_URL,
  DRONE_NETHELY_URL,
  GRAFANA_NETHELY_URL,
} = process.env

const formatter = new Intl.DateTimeFormat('en-US', {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

const updateMethod = async () => {
  return Promise.all([
    fetch(NETHELY_URL),
    fetch(DRONE_NETHELY_URL),
    fetch(GRAFANA_NETHELY_URL),
  ])
}

updateMethod()

setInterval(async () => {
  const responses = updateMethod()
  const date = new Date()

  if (responses.some(response => !response.ok)) {
    console.error(`[${formatter.format(date)}] - Error while updating ddns record`)
  } else {
    console.log(`[${formatter.format(date)}] - Update OK`)
  }
}, FIVE_MINUTES)
