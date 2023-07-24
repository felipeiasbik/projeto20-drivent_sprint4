import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createRoom(hotelId: number) {
  return prisma.room.create({
    data: {
      name: faker.datatype.number().toString(),
      capacity: faker.datatype.number({ min: 1, max: 3 }),
      hotelId,
    },
  });
}
