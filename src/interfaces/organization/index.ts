import { BillPaymentInterface } from 'interfaces/bill-payment';
import { MeterInterface } from 'interfaces/meter';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  bill_payment?: BillPaymentInterface[];
  meter?: MeterInterface[];
  user?: UserInterface;
  _count?: {
    bill_payment?: number;
    meter?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
