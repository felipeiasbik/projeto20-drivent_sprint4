import bookingRepository from '../../repositories/booking-repository';

async function getBooking(userId: number) {
  return await bookingRepository.getBooking(userId);
}

const bookingService = {
  getBooking,
};

export default bookingService;
