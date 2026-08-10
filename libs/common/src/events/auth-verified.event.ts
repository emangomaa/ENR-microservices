export class AuthVerifiedEvent {
  constructor(
    public readonly userId: number,
    public readonly email: string,
  ) {}
}