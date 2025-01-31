import { Server } from '@hapi/hapi';
import { fetchAll, detailById, create, updateById, deleteById } from './item.controller';

export const itemRoutes = (server: Server) => {
  const rootPath = '/items';

  server.route({
    method: 'GET',
    path: `${rootPath}`,
    handler: fetchAll
  });

  server.route({
    method: 'GET',
    path: `${rootPath}/{id}`,
    handler: detailById
  });

  server.route({
    method: 'POST',
    path: `${rootPath}`,
    handler: create
  });

  server.route({
    method: 'PUT',
    path: `${rootPath}/{id}`,
    handler: updateById
  });

  server.route({
    method: 'DELETE',
    path: `${rootPath}/{id}`,
    handler: deleteById
  });
}