export class ForgetPasswordEvent {
  constructor(
    public readonly userId: number,
    public readonly email: string,
    public readonly otp: string,
  ) {}
}