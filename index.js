import dotenv from 'dotenv'
dotenv.config();

const FIVE_MINUTES = 1000 * 60 * 5;

const { NETHELY_URL } = process.env

setInterval(async () => {
  const response = await fetch(NETHELY_URL);

  if (!response.ok) {
    console.error('Error while updating ddns record');
  } else {
    console.log('Update OK');
  }
}, FIVE_MINUTES);
