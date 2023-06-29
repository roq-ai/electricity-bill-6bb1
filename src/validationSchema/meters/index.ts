import * as yup from 'yup';

export const meterValidationSchema = yup.object().shape({
  meter_number: yup.string().required(),
  remaining_units: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
