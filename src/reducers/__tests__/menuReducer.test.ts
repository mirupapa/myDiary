import { initialState, reducer } from '../menuReducer'

describe('menuReducer test', () => {
  it('UPDATE_NAME', () => {
    const state = reducer(initialState, { type: 'UPDATE_IS_MENU_VIEW', payload: true })
    expect(state.isMenuView).toBe(true)
  })
  it('UPDATE_PASSWORD', () => {
    const state = reducer(initialState, { type: 'UPDATE_IS_MODAL_VIEW', payload: true })
    expect(state.isModalView).toBe(true)
  })
})
