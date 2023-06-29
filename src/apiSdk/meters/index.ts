import axios from 'axios';
import queryString from 'query-string';
import { MeterInterface, MeterGetQueryInterface } from 'interfaces/meter';
import { GetQueryInterface } from '../../interfaces';

export const getMeters = async (query?: MeterGetQueryInterface) => {
  const response = await axios.get(`/api/meters${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMeter = async (meter: MeterInterface) => {
  const response = await axios.post('/api/meters', meter);
  return response.data;
};

export const updateMeterById = async (id: string, meter: MeterInterface) => {
  const response = await axios.put(`/api/meters/${id}`, meter);
  return response.data;
};

export const getMeterById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/meters/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMeterById = async (id: string) => {
  const response = await axios.delete(`/api/meters/${id}`);
  return response.data;
};
