import { initEnv } from './env/enviornment.js';
import { initDatabase } from './database.js';
import { initApp } from './app.js';

function start() {
  try {
    initEnv();
    const DB = initDatabase();
    const APP = initApp(DB);
  } catch (err) {}
}

start();
