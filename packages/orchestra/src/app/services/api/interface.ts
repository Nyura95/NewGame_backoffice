export interface IResponseAPI<T> {
  Comment: string
  Data: T
  Hash: string
  I18nComment: string
  Reason: number
  ServerTime: string
  StatusCode: number
  Success: boolean
  Version: string
}

export interface IOauthResponse {
  RefreshToken: string
  Token: string
}

export interface IResource {
  Capacity: number
  CreatedAt: string
  Generation: number
  ID: number
  IDPlanet: number
  IDResource: number
  UpdatedAt: string
  Value: number
}

export interface IPlanet {
  CreatedAt: string
  ID: number
  IDAccount: number
  Name: string
  UpdatedAt: string
}

export interface IPlanetBuilding {
  CanBeBuild: boolean
  CreatedAt: string
  Group: string
  ID: number
  IDBuilding: number
  IDPlanet: number
  IsOnBuilding: boolean
  Level: number
  LevelUpdate: number
  Name: string
  NextLevel: INextLevel
  UpdatedAt: string
}

export interface IBuilding {
  CreatedAt: string
  ID: number
  IDBuildingGroup: number
  InitialBuildingTime: number
  Name: string
  UpdatedAt: string
}

export interface IBuildingConstruct {
  Building: IBuilding
  CreatedAt: string
  DateEnd: string
  ID: number
  IDPlanet: number
  IDPlanetBuilding: number
  IDStatusBuilding: number
  UpdatedAt: string
}

export interface IResearchConstruct {
  CreatedAt: string
  DateEnd: string
  ID: number
  IDAccount: number
  IDAccountResearch: number
  IDPlanet: number
  IDStatusResearch: number
  Research: IResearch
  UpdatedAt: string
}

export interface IResource {
  Capacity: number
  CreatedAt: string
  Generation: number
  ID: number
  IDPlanet: number
  IDResource: number
  UpdatedAt: string
  Value: number
}

export interface IAccount {
  CreatedAt: string
  Email: string
  ID: number
  IDPlanetFocus: number
  Planets: IPlanet[]
  UpdatedAt: string
}

export interface IAccountPublic {
  CreatedAt: string
  Email: string
  ID: number
  UpdatedAt: string
}

export interface IPlanet {
  Focus: boolean
  ID: number
  Name: string
}

export interface IAccountResearch {
  CanBeResearch: boolean
  CreatedAt: string
  Group: string
  ID: number
  IDResearch: number
  IsOnResearch: boolean
  Level: number
  LevelUpdate: number
  Name: string
  NextLevel: INextLevel
  Rul: IResearchConstruct
  UpdatedAt: string
}

export interface IResearch {
  CreatedAt: string
  ID: number
  IDResearchGroup: number
  InitialResearchTime: number
  Name: string
  UpdatedAt: string
}

export interface INextLevel {
  Costs: {
    IDResource: number
    Value: number
  }[]
  Time: number
}
