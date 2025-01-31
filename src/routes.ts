import { Server } from '@hapi/hapi';
import { indexRoutes } from './app/index/index.route';
import { itemRoutes } from './app/item/item.route';

export const defineRoutes = (server: Server) => {
    indexRoutes(server);
    itemRoutes(server);
}