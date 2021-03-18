export class ChangePasswordCommand {
  constructor(
    public document: string,
    public password: string,
    public newPassword: string,
  ) {}
}
