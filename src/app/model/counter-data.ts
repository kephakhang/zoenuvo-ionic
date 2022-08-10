export class CounterData {
  constructor(
    public id: string,
    public tenantId: string,
    public version: number,
    public status: number,
    public regDatetime: string,
    public modDatetime: string
  ) {}
}

export class WrapperCounterData extends CounterData {
  public check: boolean = false
  constructor(
    public id: string,
    public tenantId: string,
    public version: number,
    public status: number,
    public regDatetime: string,
    public modDatetime: string
  ) {
    super(id, tenantId, version, status, regDatetime, modDatetime)
  }
}
