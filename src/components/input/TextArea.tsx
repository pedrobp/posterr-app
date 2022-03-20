import { FC, HTMLProps } from 'react'

const TextArea: FC<HTMLProps<HTMLTextAreaElement>> = (props) => {
  return (
    <textarea
      {...props}
      style={{ resize: 'none' }}
      className="w-full border-2 rounded-md focus:border-primary outline-none p-2"
    />
  )
}

export default TextArea
