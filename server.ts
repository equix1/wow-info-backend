import app from './app';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { handleAccessToken } from './src/utils/blizzard/apiClient';

dotenv.config();

cron.schedule('0 * * * *', handleAccessToken);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`
    Server is running on port ${PORT}
    http://localhost:${PORT}
    `);
});