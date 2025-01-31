import { Item } from "../entities/item.entity";

export const formatItem = (item: Item) => {
  return {
    id: item.id,
    name: item.name,
    price: parseInt(item.price.toString(), 10)
  };
};