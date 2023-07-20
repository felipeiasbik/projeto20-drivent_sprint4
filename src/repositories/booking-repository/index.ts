import { prisma } from '../../config';

async function getBooking(userId: number) {
  return await prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

const bookingRepository = {
  getBooking,
};

export default bookingRepository;
