export class TerminalData {
  constructor(
    public id: string,
    public tenantId: string,
    public version: number,
    public status: number,
    public ip: string,
    public regDatetime: string,
    public modDatetime: string
  ) {}
}

export class WrapperTerminalData extends TerminalData {
  public check: boolean = false
  constructor(
    public id: string,
    public tenantId: string,
    public version: number,
    public status: number,
    public ip: string,
    public regDatetime: string,
    public modDatetime: string
  ) {
    super(id, tenantId, version, status, ip, regDatetime, modDatetime)
  }
}
