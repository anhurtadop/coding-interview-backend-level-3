import Hapi from '@hapi/hapi';
import { defineRoutes } from './routes';
import { appDataSource } from './core/data-source';
import { config } from './core/config';

const getServer = () => {
    const server = Hapi.server({
        host: config.node.host,
        port: config.node.port,
    });
    defineRoutes(server);
    return server;
}

export const initializeServer = async () => {
    const server = getServer();
    if (!appDataSource.isInitialized) {
        await appDataSource.initialize();
    }
    await server.initialize();
    return server;
}

export const startServer = async () => {
    await initializeServer();
    const server = getServer();
    if (!appDataSource.isInitialized) {
        await appDataSource.initialize();
    }
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
};