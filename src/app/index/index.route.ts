import { Server } from '@hapi/hapi';
import { ping } from './index.controller';

export const indexRoutes = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/ping',
    handler: ping
  });
}