import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getMeterById, updateMeterById } from 'apiSdk/meters';
import { Error } from 'components/error';
import { meterValidationSchema } from 'validationSchema/meters';
import { MeterInterface } from 'interfaces/meter';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function MeterEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<MeterInterface>(
    () => (id ? `/meters/${id}` : null),
    () => getMeterById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: MeterInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateMeterById(id, values);
      mutate(updated);
      resetForm();
      router.push('/meters');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<MeterInterface>({
    initialValues: data,
    validationSchema: meterValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Meter
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="meter_number" mb="4" isInvalid={!!formik.errors?.meter_number}>
              <FormLabel>Meter Number</FormLabel>
              <Input
                type="text"
                name="meter_number"
                value={formik.values?.meter_number}
                onChange={formik.handleChange}
              />
              {formik.errors.meter_number && <FormErrorMessage>{formik.errors?.meter_number}</FormErrorMessage>}
            </FormControl>
            <FormControl id="remaining_units" mb="4" isInvalid={!!formik.errors?.remaining_units}>
              <FormLabel>Remaining Units</FormLabel>
              <NumberInput
                name="remaining_units"
                value={formik.values?.remaining_units}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('remaining_units', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.remaining_units && <FormErrorMessage>{formik.errors?.remaining_units}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<OrganizationInterface>
              formik={formik}
              name={'organization_id'}
              label={'Select Organization'}
              placeholder={'Select Organization'}
              fetcher={getOrganizations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'meter',
    operation: AccessOperationEnum.UPDATE,
  }),
)(MeterEditPage);
