export class CreateAccountCommand {
  constructor(
    public username: string,
    public email: string,
    public roles: string[],
    public password: string,
  ) {}
}
