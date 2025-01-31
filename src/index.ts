import 'reflect-metadata';
import { initializeServer, startServer } from './server';

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
})

initializeServer();
startServer();