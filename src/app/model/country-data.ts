export class CountryData {
  constructor(
    public id: string,
    public name: string,
    public continentId: string
  ) {}
}

export class WrapperCountryData extends CountryData {
  public check: boolean = false
  constructor(
    public id: string,
    public name: string,
    public continentId: string
  ) {
    super(id, name, continentId)
  }
}
