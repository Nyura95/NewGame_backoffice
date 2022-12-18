export interface ITranslation {
  errors: {
    [key: string]: IMessage
  }
  notifications: {
    [key: string]: IMessage
  }
  pages: {
    login: {
      [key: string]: string
    }
  }
  plugins: {
    configurator: {
      [key: string]: string
    }
  }
  sidebar: {
    admin: {
      [key: string]: string
    }
  }
  table: {
    info: string
    noData: string
  }
}

interface IMessage {
  [key: string]: string
  title: string
}
