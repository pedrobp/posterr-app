import Toast from 'components/toast'
import { createContext, FC, useCallback, useState } from 'react'
import { VOID_FUNC } from 'types'

interface ContextProps {
  toast: (msg: string) => void
}

export const ToastContext = createContext<ContextProps>({
  toast: VOID_FUNC,
})

const ToastContextProvider: FC = ({ children }) => {
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)

  const toast = useCallback((msg: string) => {
    setMessage(msg)
    setShow(true)

    setTimeout(() => setShow(false), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <Toast show={show} message={message} />
      {children}
    </ToastContext.Provider>
  )
}

export default ToastContextProvider
