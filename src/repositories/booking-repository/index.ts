import { prisma } from '../../config';

async function getBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

async function getAllRoomsByRoomId(roomId: number) {
  return await prisma.booking.findMany({
    where: { roomId },
  });
}

async function createBooking(roomId: number, userId: number) {
  return await prisma.booking.create({
    data: { roomId, userId },
  });
}

async function editBooking(roomId: number, userId: number) {
  return await prisma.booking.create({
    data: { roomId, userId },
  });
}

async function deleteBooking(id: number) {
  return await prisma.booking.delete({
    where: { id },
  });
}

const bookingRepository = {
  getBooking,
  getAllRoomsByRoomId,
  createBooking,
  editBooking,
  deleteBooking,
};

export default bookingRepository;
