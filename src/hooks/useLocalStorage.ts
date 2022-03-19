import { Dispatch, SetStateAction } from 'react'
import { useEffectOnce, useLocalStorage } from 'usehooks-ts'

export const useLocalStorageData = <T>(
  key: string,
  initialValues: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useLocalStorage(key, initialValues)

  useEffectOnce(() => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initialValues))
    }
  })

  return [value, setValue]
}
