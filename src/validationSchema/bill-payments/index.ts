import * as yup from 'yup';

export const billPaymentValidationSchema = yup.object().shape({
  payment_date: yup.date().required(),
  amount: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
