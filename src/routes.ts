import { Server } from '@hapi/hapi';

import { indexRoutes } from './app/index/index.route';

export const defineRoutes = (server: Server) => {
    indexRoutes(server);
}