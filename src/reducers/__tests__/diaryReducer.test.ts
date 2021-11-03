import { DiaryType } from '@/types/diary'
import { initialState, reducer } from '../diaryReducer'

const mockDiary: DiaryType = {
  id: '1',
  title: 'title',
  text: 'text',
  date: '2021-10-21',
}

describe('diaryReducer test', () => {
  it('SET_DIARIES', () => {
    const diaries: DiaryType[] = [mockDiary]
    const state = reducer(initialState, { type: 'SET_DIARIES', payload: diaries })
    expect(state.diaries).toBe(diaries)
  })
  it('UPDATE_PASSWORD', () => {
    const state = reducer(initialState, { type: 'UPDATE_IS_MODAL_VIEW', payload: true })
    expect(state.isModalView).toBe(true)
  })
  it('SET_TARGET_DIARY', () => {
    const state = reducer(initialState, { type: 'SET_TARGET_DIARY', payload: mockDiary })
    expect(state.targetDiary).toBe(mockDiary)
  })
  it('UPDATE_TITLE', () => {
    const state = reducer(initialState, { type: 'UPDATE_TITLE', payload: 'title' })
    expect(state.title).toBe('title')
  })
  it('UPDATE_TEXT', () => {
    const state = reducer(initialState, { type: 'UPDATE_TEXT', payload: 'text' })
    expect(state.text).toBe('text')
  })
  it('UPDATE_DATE', () => {
    const state = reducer(initialState, { type: 'UPDATE_DATE', payload: '2021-02-10' })
    expect(state.date).toBe('2021-02-10')
  })
})
