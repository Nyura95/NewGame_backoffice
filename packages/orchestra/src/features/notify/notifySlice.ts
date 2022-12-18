import { createEntityAdapter, createSlice, isRejected, PayloadAction } from '@reduxjs/toolkit'
import md5 from 'md5'

import { TypeAlert } from '@cityscoot/components'

import { IErrorHandler } from '../../app/services/interface'
import { RootState } from '../../app/store'
import I18n from '../../i18n'
import { NOTIFY } from '../const'
import { INotify, INotifyBasic } from './interface'

const notifyAdapter = createEntityAdapter<INotifyBasic>({
  selectId: notify => notify.hash || '',
})

export const notifySlice = createSlice({
  name: NOTIFY,
  initialState: notifyAdapter.getInitialState(),
  reducers: {
    add: (state, action: PayloadAction<INotify>) => {
      const notify: INotifyBasic = {
        ...action.payload,
        title: '',
        message: '',
        hash: md5(`${action.payload.type}${state.ids.length}${new Date()}`),
      }
      if ('i18n' in action.payload) {
        notify.title = I18n.t(`notifications.${action.payload.i18n}.title`)
        notify.message = I18n.t(`notifications.${action.payload.i18n}.message`)
      }
      if ('title' in action.payload) {
        notify.title = action.payload.title
        notify.message = action.payload.message
      }

      notifyAdapter.addOne(state, notify)
    },
    remove: notifyAdapter.removeOne,
    removeAll: notifyAdapter.removeAll,
  },
  extraReducers: builder => {
    builder.addMatcher(isRejected, (state, action) => {
      if (action.payload) {
        const data = action.payload as unknown as IErrorHandler

        notifyAdapter.addOne(state, {
          message: I18n.t([
            `errors.${data.i18n_path}.${data.i18n_message}`,
            'errors.general.message',
          ]),
          title: I18n.t([`errors.${data.i18n_path}.title`, 'errors.general.title']),
          type: TypeAlert.danger,
          hash: 'test',
        })
      }
    })
  },
})

export const { add, remove, removeAll } = notifySlice.actions

export const notifySelector = notifyAdapter.getSelectors<RootState>(state => state.notify)

export default notifySlice.reducer
