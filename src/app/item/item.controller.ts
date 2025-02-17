import { appDataSource } from "../../core/data-source";
import { Item } from "../../core/entities/item.entity";
import { formatItem } from "../../core/utils/format.util";

export const fetchAll = async (request: any, h: any) => {
  const records = await appDataSource.getRepository(Item).find();
  const list = records.map((record) => formatItem(record));
  return h.response(list).code(200);
}

export const detailById = async (request: any, h: any) => {
  const id = parseInt(request.params.id, 10);
  if (isNaN(id)) return h.response().code(404);

  const record = await appDataSource.getRepository(Item).findOneBy({ id });
  if (!record) return h.response().code(404);

  const item = formatItem(record);
  return h.response(item).code(200);
}

export const create = async (request: any, h: any) => {
  const payload = request.payload as Partial<Item>;
  const errors = [];

  if (!payload.name) errors.push({ field: 'name', message: 'Field "name" is required' });
  if (payload.price === undefined) {
    errors.push({ field: 'price', message: 'Field "price" is required' });
  } else if (payload.price < 0) {
    errors.push({ field: 'price', message: 'Field "price" cannot be negative' });
  }
  if (errors.length > 0) return h.response({ errors }).code(400);

  const repo = appDataSource.getRepository(Item);
  const item = repo.create(payload);
  const result = await repo.save(item);
  return h.response(result).code(201);
}

export const updateById = async (request: any, h: any) => {
  const id = parseInt(request.params.id, 10);
  if (isNaN(id)) return h.response().code(404);

  const payload = request.payload as Partial<Item>;
  const errors = [];

  if (payload.price !== undefined && payload.price < 0) {
    errors.push({ field: 'price', message: 'Field "price" cannot be negative' });
  }
  if (errors.length > 0) return h.response({ errors }).code(400);

  const repo = appDataSource.getRepository(Item);
  const existing = await repo.findOneBy({ id });
  if (!existing) return h.response().code(404);

  repo.merge(existing, payload);
  return await repo.save(existing);
}

export const deleteById = async (request: any, h: any) => {
  const id = parseInt(request.params.id, 10);
  if (isNaN(id)) return h.response().code(404);

  const item = await appDataSource.getRepository(Item).findOneBy({ id });
  if (!item) return h.response().code(404);

  await appDataSource.getRepository(Item).remove(item);
  return h.response().code(204);
}