import faker from '@faker-js/faker';
import { Address, Booking, Enrollment, Room, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';

export async function createBookingFactory(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.future(),
    },
  });
}

export function getBookingFactory() {
  const booking: Booking & { Room: Room } = {
    id: 1,
    userId: 1,
    roomId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    Room: {
      id: 1,
      name: faker.datatype.number().toString(),
      capacity: 1,
      hotelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return booking;
}

export function enrollmentWithAddressFactory() {
  const enrollment: Enrollment & { Address: Address[] } = {
    id: 1,
    name: faker.name.findName(),
    cpf: faker.datatype.number().toString(),
    birthday: new Date(),
    phone: faker.datatype.number().toString(),
    userId: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    Address: [
      {
        id: 1,
        cep: faker.address.zipCode(),
        street: faker.address.streetName(),
        city: faker.address.cityName(),
        state: faker.address.state(),
        number: faker.datatype.number().toString(),
        neighborhood: faker.name.findName(),
        addressDetail: faker.address.secondaryAddress(),
        enrollmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  };
  return enrollment;
}

export function findTicketByEnrollmentIdFactory(status: any, isRemote: boolean) {
  const ticket: Ticket & { TicketType: TicketType } = {
    id: 1,
    ticketTypeId: 1,
    enrollmentId: 1,
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
    TicketType: {
      id: 1,
      name: faker.name.findName(),
      price: faker.datatype.number(),
      isRemote,
      includesHotel: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  };
  return ticket;
}

export function findTicketTypeRepository(isRemote: boolean, includesHotel: boolean) {
  const ticketType: TicketType = {
    id: 1,
    name: faker.name.findName(),
    price: faker.datatype.number(),
    isRemote,
    includesHotel,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return ticketType;
}

export function getRoomFactory(capacity: number) {
  const room: Room = {
    id: 1,
    name: faker.datatype.number().toString(),
    capacity,
    hotelId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return room;
}

export function findBookingFactory() {
  const booking: Booking[] = [
    {
      id: 1,
      userId: 1,
      roomId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  return booking;
}
