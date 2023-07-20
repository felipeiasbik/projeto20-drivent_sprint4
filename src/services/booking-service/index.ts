import { forbiddenError, notFoundError } from '../../errors';
import bookingRepository from '../../repositories/booking-repository';
import enrollmentRepository from '../../repositories/enrollment-repository';
import roomRepository from '../../repositories/room-repository';
import ticketTypeRepository from '../../repositories/ticket-type-repository';
import ticketsRepository from '../../repositories/tickets-repository';

async function getBooking(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();

  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function createBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) throw notFoundError();
  if (ticket.status !== 'PAID') throw forbiddenError();

  const ticketType = await ticketTypeRepository.getTicketType(ticket.ticketTypeId);
  if (ticketType.isRemote === true || ticketType.includesHotel === false) throw forbiddenError();

  const room = await roomRepository.getRoom(roomId);
  if (!room) throw notFoundError();

  const availableRoom = await bookingRepository.getAllRoomsByRoomId(roomId);
  if (availableRoom.length >= room.capacity) throw forbiddenError();

  const booking = await bookingRepository.createBooking(roomId, userId);
  return { bookingId: booking.id };
}

async function editBooking(userId: number, roomId: number) {
  const booking = await bookingRepository.getBooking(userId);
  if (!booking) throw forbiddenError();

  const room = await roomRepository.getRoom(roomId);
  if (!room) throw notFoundError();

  const availableRoom = await bookingRepository.getAllRoomsByRoomId(roomId);
  if (availableRoom.length >= room.capacity) throw forbiddenError();

  const newBooking = await bookingRepository.editBooking(roomId, userId);
  await bookingRepository.deleteBooking(booking.id);

  return { bookingId: newBooking.id };
}

const bookingService = {
  getBooking,
  createBooking,
  editBooking,
};

export default bookingService;
