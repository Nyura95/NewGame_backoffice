import { AUTH_SUCCESS, COPY_SUCCESS, CREATE_SUCCESS } from './const'
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
    [CREATE_SUCCESS]: {
      title: 'Création',
      message: 'La création du compte à été faite',
    },
    [AUTH_SUCCESS]: {
      title: 'Authentification google',
      message: 'Une erreur est survenu avec google',
    },
    [COPY_SUCCESS]: {
      title: 'Copie clipboard',
      message: 'Le token à bien été copier',
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
  },
}
