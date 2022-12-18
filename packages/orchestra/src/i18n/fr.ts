import { AUTH_SUCCESS } from './const'
import { ITranslation } from './interface'

export const fr: ITranslation = {
  pages: {
    login: {
      title: 'Orchestra V2',
      connect: 'Connexion',
    },
  },
  sidebar: {
    admin: {
      title: 'Administration',
    },
  },
  plugins: {
    configurator: {
      title: 'Configurateur',
      color: 'Couleur primaire',
      type: 'Type de la barre vertical',

      typeChoiceDark: 'Sombre',
      typeChoiceTransparent: 'Transparent',
      typeChoiceWhite: 'Claire',

      theme: 'Theme général',
      themeChoice: 'Claire / Sombre',
      navbar: 'Type de la barre horizontal',
      navbarChoice: 'Fixe',
    },
  },
  table: {
    noData: 'Aucune donnée',
    info: 'Affichage de {from} à {to} pour {total} éléments ({sync})',
  },
  notifications: {
    [AUTH_SUCCESS]: {
      title: 'Authentification google',
      message: 'Une erreur est survenu avec google',
    },
  },
  errors: {
    general: {
      title: 'Oups !',
      message: 'Une erreur inconnu est survenu.',
    },
    login: {
      title: 'Authentification',
      message: 'default message',
      ERROR_LOGIN: 'Erreur de mot de passe ou compte inexistant',
    },
    scooters: {
      title: 'Scooter API',
      ERROR_AUTH: "Vous n'êtes pas autoriser à effectuer cette action",
    },
  },
}