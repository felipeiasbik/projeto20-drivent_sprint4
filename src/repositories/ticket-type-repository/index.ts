import { prisma } from '../../config';

async function getTicketType(id: number) {
  return await prisma.ticketType.findFirst({
    where: { id },
  });
}

const ticketTypeRepository = {
  getTicketType,
};

export default ticketTypeRepository;
