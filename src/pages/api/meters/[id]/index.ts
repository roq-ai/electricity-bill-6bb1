import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { meterValidationSchema } from 'validationSchema/meters';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.meter
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getMeterById();
    case 'PUT':
      return updateMeterById();
    case 'DELETE':
      return deleteMeterById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMeterById() {
    const data = await prisma.meter.findFirst(convertQueryToPrismaUtil(req.query, 'meter'));
    return res.status(200).json(data);
  }

  async function updateMeterById() {
    await meterValidationSchema.validate(req.body);
    const data = await prisma.meter.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteMeterById() {
    const data = await prisma.meter.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
