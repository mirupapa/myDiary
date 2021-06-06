import * as yup from 'yup'
import { DiaryType } from '../types/diary'
import { validator } from '../utils/validator'
import dayjs from 'dayjs'

export type State = {
  diaries: DiaryType[]
  isModalView: boolean
  targetDiary: DiaryType
  title: string
  text: string
  date: string
  err_title: string
  isDisabled: boolean
}

export const initialState: State = {
  diaries: [],
  isModalView: false,
  targetDiary: {
    id: '',
    title: '',
    text: '',
    date: '',
  },
  title: '',
  text: '',
  date: dayjs().format('YYYY-MM-DD'),
  err_title: '',
  isDisabled: true,
}

export type Action =
  | { type: 'SET_DIARIES'; payload: DiaryType[] }
  | { type: 'UPDATE_IS_MODAL_VIEW'; payload: boolean }
  | { type: 'SET_TARGET_DIARY'; payload: DiaryType }
  | { type: 'UPDATE_TITLE'; payload: string }
  | { type: 'UPDATE_TEXT'; payload: string }
  | { type: 'UPDATE_DATE'; payload: string }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DIARIES': {
      return {
        ...state,
        diaries: action.payload,
      }
    }
    case 'UPDATE_IS_MODAL_VIEW': {
      return {
        ...state,
        isModalView: action.payload,
      }
    }
    case 'SET_TARGET_DIARY': {
      return {
        ...state,
        targetDiary: action.payload,
      }
    }
    case 'UPDATE_TITLE': {
      const validate = yup.string().required('title is required')
      const err_title = validator(validate, action.payload)
      return {
        ...state,
        title: action.payload,
        err_title: err_title,
        isDisabled: err_title.length > 0 || action.payload.length === 0,
      }
    }
    case 'UPDATE_TEXT': {
      return {
        ...state,
        text: action.payload,
      }
    }
    case 'UPDATE_DATE': {
      return {
        ...state,
        date: action.payload,
      }
    }
  }
}
