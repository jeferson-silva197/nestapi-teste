export class CreateCustomerDto {
  constructor(
    public username: string,
    public name: string,
    public document: string,
    public email: string,
    public password: string,
  ) {}
}
