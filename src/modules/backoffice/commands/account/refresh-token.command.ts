export class RefreshTokenCommand {
  constructor(
    public document: string,
    public email: string,
    public roles: string[],
  ) {}
}
