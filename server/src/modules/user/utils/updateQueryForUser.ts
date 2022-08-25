import { getConnection } from 'typeorm';

export default async (entity, value, searchId) =>
  await getConnection()
    .createQueryBuilder()
    .update(entity)
    .set(value)
    .where('id = :id', { id: searchId })
    .execute();
