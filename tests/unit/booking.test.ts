import faker from '@faker-js/faker';
import {
  createBookingFactory,
  enrollmentWithAddressFactory,
  findBookingFactory,
  findTicketByEnrollmentIdFactory,
  findTicketTypeRepository,
  getBookingFactory,
  getRoomFactory,
} from '../factories/booking-factory';
import ticketTypeRepository from '@/repositories/ticket-type-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import bookingRepository from '@/repositories/booking-repository';
import bookingService from '@/services/booking-service';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('GET /booking', () => {
  it('should respond with status 404 if user has not booked a room', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentWithAddressFactory());
    jest
      .spyOn(ticketsRepository, 'findTicketByEnrollmentId')
      .mockResolvedValueOnce(findTicketByEnrollmentIdFactory('PAID', false));
    jest.spyOn(bookingRepository, 'getBooking').mockResolvedValueOnce(null);
    const booking = bookingService.getBooking(userId);
    expect(booking).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });
});

describe('POST /booking', () => {
  it('should respond with status 403 if ticket is remote', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentWithAddressFactory());
    jest
      .spyOn(ticketsRepository, 'findTicketByEnrollmentId')
      .mockResolvedValueOnce(findTicketByEnrollmentIdFactory('PAID', true));
    jest.spyOn(ticketTypeRepository, 'getTicketType').mockResolvedValueOnce(findTicketTypeRepository(true, true));
    const booking = bookingService.createBooking(userId, roomId);
    expect(booking).rejects.toEqual({
      name: 'Forbidden',
      message: 'Forbidden access!',
    });
  });

  it('should respond with status 403 if ticket not includes hotel', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentWithAddressFactory());
    jest
      .spyOn(ticketsRepository, 'findTicketByEnrollmentId')
      .mockResolvedValueOnce(findTicketByEnrollmentIdFactory('PAID', true));
    jest.spyOn(ticketTypeRepository, 'getTicketType').mockResolvedValueOnce(findTicketTypeRepository(false, false));
    const booking = bookingService.createBooking(userId, roomId);
    expect(booking).rejects.toEqual({
      name: 'Forbidden',
      message: 'Forbidden access!',
    });
  });

  it('should respond with status 403 when ticket not PAID', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentWithAddressFactory());
    jest
      .spyOn(ticketsRepository, 'findTicketByEnrollmentId')
      .mockResolvedValueOnce(findTicketByEnrollmentIdFactory('RESERVED', true));
    const booking = bookingService.createBooking(userId, roomId);
    expect(booking).rejects.toEqual({
      name: 'Forbidden',
      message: 'Forbidden access!',
    });
  });

  it('should respond with status 404 if room dont exists', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentWithAddressFactory());
    jest
      .spyOn(ticketsRepository, 'findTicketByEnrollmentId')
      .mockResolvedValueOnce(findTicketByEnrollmentIdFactory('PAID', true));
    jest.spyOn(ticketTypeRepository, 'getTicketType').mockResolvedValueOnce(findTicketTypeRepository(false, true));
    jest.spyOn(roomRepository, 'getRoom').mockResolvedValueOnce(null);
    const booking = bookingService.createBooking(userId, roomId);
    expect(booking).rejects.toEqual({
      name: 'NotFoundError',
      message: 'No result for this search!',
    });
  });

  it('should respond with status 403 if room has no vacancies', async () => {
    const userId = 1;
    const roomId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValueOnce(enrollmentWithAddressFactory());
    jest
      .spyOn(ticketsRepository, 'findTicketByEnrollmentId')
      .mockResolvedValueOnce(findTicketByEnrollmentIdFactory('PAID', true));
    jest.spyOn(ticketTypeRepository, 'getTicketType').mockResolvedValueOnce(findTicketTypeRepository(false, true));
    jest.spyOn(roomRepository, 'getRoom').mockResolvedValueOnce(getRoomFactory(0));
    jest.spyOn(bookingRepository, 'getAllRoomsByRoomId').mockResolvedValueOnce(findBookingFactory());
    const booking = bookingService.createBooking(userId, roomId);
    expect(booking).rejects.toEqual({
      name: 'Forbidden',
      message: 'Forbidden access!',
    });
  });
});
