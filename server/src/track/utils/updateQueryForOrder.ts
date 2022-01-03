import { getConnection } from 'typeorm';

export default async (entity, order, userId) =>
  await getConnection()
    .createQueryBuilder()
    .update(entity)
    .set({ order })
    .where('userId = :userId', { userId })
    .execute();
