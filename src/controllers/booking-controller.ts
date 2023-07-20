import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares';
import bookingService from '../services/booking-service';

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const booking = await bookingService.getBooking(userId);
  res.send(booking);
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  const booking = await bookingService.createBooking(userId, roomId);
  res.send(booking);
}

export async function editBooking(req: AuthenticatedRequest, res: Response) {
  res.send('Edit Booking');
}
