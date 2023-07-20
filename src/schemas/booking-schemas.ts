import Joi from 'joi';
import { Booking } from '@/protocols';

export const bookingSchema = Joi.object<Booking>({
  roomId: Joi.number().required(),
});
