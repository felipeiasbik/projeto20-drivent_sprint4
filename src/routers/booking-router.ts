import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { createBooking, editBooking, getBooking } from '../controllers/booking-controller';
import { bookingSchema } from '../schemas/booking-schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', validateBody(bookingSchema), createBooking)
  .put('/:bookingId', validateBody(bookingSchema), editBooking);

export { bookingRouter };
