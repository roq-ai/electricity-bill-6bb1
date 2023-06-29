import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface BillPaymentInterface {
  id?: string;
  payment_date: any;
  amount: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface BillPaymentGetQueryInterface extends GetQueryInterface {
  id?: string;
  organization_id?: string;
}
