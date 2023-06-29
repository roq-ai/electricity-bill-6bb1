import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { billPaymentValidationSchema } from 'validationSchema/bill-payments';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.bill_payment
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getBillPaymentById();
    case 'PUT':
      return updateBillPaymentById();
    case 'DELETE':
      return deleteBillPaymentById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBillPaymentById() {
    const data = await prisma.bill_payment.findFirst(convertQueryToPrismaUtil(req.query, 'bill_payment'));
    return res.status(200).json(data);
  }

  async function updateBillPaymentById() {
    await billPaymentValidationSchema.validate(req.body);
    const data = await prisma.bill_payment.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteBillPaymentById() {
    const data = await prisma.bill_payment.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
