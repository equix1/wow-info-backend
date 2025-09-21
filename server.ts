import app from './app';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { handleBattleNetAccessToken } from './src/module/battlenet/api';

dotenv.config();

cron.schedule('0 * * * *', handleBattleNetAccessToken);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`
    Server is running on port ${PORT}
    http://localhost:${PORT}
    `);
});