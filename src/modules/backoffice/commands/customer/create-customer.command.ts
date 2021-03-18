import { Customer } from '../../models/customer.model';
export class CreateCustomerCommand {
  constructor(public customer: Customer) {}
}
