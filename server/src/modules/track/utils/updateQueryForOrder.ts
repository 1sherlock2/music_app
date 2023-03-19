export default async (entity, order, userId) =>
  await entity
    .createQueryBuilder()
    .update(entity)
    .set({ order })
    .where('userId = :userId', { userId })
    .execute();
