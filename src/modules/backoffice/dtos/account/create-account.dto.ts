export class CreateAccountDto {
  constructor(
    public username: string,
    public document: string,
    public email: string,
    public password: string,
  ) {}
}
