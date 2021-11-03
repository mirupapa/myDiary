import { initialState, reducer } from '../loginReducer'

describe('loginReducer test', () => {
  it('UPDATE_NAME', () => {
    const state = reducer(initialState, { type: 'UPDATE_EMAIL', payload: 'test@test.test' })
    expect(state.email).toBe('test@test.test')
  })
  it('UPDATE_PASSWORD', () => {
    const state = reducer(initialState, { type: 'UPDATE_PASSWORD', payload: 'test1234' })
    expect(state.password).toBe('test1234')
  })
})
