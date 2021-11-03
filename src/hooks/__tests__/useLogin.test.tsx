import React, { ReactChild } from 'react'
// import { CommonProvider } from '@/context/commonContext'
import { renderHook, act } from '@testing-library/react-hooks'
import useLogin from '../useLogin'

// const wrapper: React.FC<{ children: ReactChild }> = ({ children }) => {
//   return <CommonProvider>{children}</CommonProvider>
// }

describe('useLogin', async () => {
  const { result, waitForNextUpdate } = await renderHook(() => useLogin())
  waitForNextUpdate({ timeout: 10000 })
  console.log(result.current.state)
})
