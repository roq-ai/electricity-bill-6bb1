import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface MeterInterface {
  id?: string;
  meter_number: string;
  remaining_units: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface MeterGetQueryInterface extends GetQueryInterface {
  id?: string;
  meter_number?: string;
  organization_id?: string;
}
