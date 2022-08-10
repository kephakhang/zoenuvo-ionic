export class TenantData {
  constructor(
    public id: string,
    public name: string,
    public type: number,
    public description: string,
    public countryCode: string,
    public hostUrl: string,
    public prefix: string,
    public hostname: string,
    public enable: boolean,
    public regDatetime: string,
    public modDatetime: string
  ) {}
}

export class WrapperTenantData extends TenantData {
  public check: boolean = false
  constructor(
    public id: string,
    public name: string,
    public type: number,
    public description: string,
    public countryCode: string,
    public hostUrl: string,
    public prefix: string,
    public hostname: string,
    public enable: boolean,
    public regDatetime: string,
    public modDatetime: string
  ) {
    super(
      id,
      name,
      type,
      description,
      countryCode,
      hostUrl,
      prefix,
      hostname,
      enable,
      regDatetime,
      modDatetime
    )
  }
}
