import fs from 'fs';
import path from 'path';

const configPath = path.resolve(__dirname, 'config.json');

interface Config {
  battleNetAccessToken: string;
  warcraftLogsAccessToken: string;
}

export function readConfig(): Config {
  const rawData = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(rawData) as Config;
};

export function updateConfig(newConfig: Partial<Config>) {
  const config = readConfig();
  const updatedConfig = { ...config, ...newConfig };
  fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2), 'utf8');
};