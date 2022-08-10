export class UserData {
  constructor(
    public id: string,
    public tenantId: string,
    public name: string,
    public email: string,
    public mobile: string,
    public level: number,
    public regDatetime: string,
    public modDatetime: string
  ) {}
}

export class WrapperUserData extends UserData {
  public check: boolean = false
  constructor(
    public id: string,
    public tenantId: string,
    public name: string,
    public email: string,
    public mobile: string,
    public level: number,
    public regDatetime: string,
    public modDatetime: string
  ) {
    super(id, tenantId, name, email, mobile, level, regDatetime, modDatetime)
  }
}
