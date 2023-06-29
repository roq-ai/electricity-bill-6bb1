import axios from 'axios';
import queryString from 'query-string';
import { BillPaymentInterface, BillPaymentGetQueryInterface } from 'interfaces/bill-payment';
import { GetQueryInterface } from '../../interfaces';

export const getBillPayments = async (query?: BillPaymentGetQueryInterface) => {
  const response = await axios.get(`/api/bill-payments${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createBillPayment = async (billPayment: BillPaymentInterface) => {
  const response = await axios.post('/api/bill-payments', billPayment);
  return response.data;
};

export const updateBillPaymentById = async (id: string, billPayment: BillPaymentInterface) => {
  const response = await axios.put(`/api/bill-payments/${id}`, billPayment);
  return response.data;
};

export const getBillPaymentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/bill-payments/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBillPaymentById = async (id: string) => {
  const response = await axios.delete(`/api/bill-payments/${id}`);
  return response.data;
};
