'use client'

import { Button, ButtonProps } from '@nextui-org/react'
import { FC } from 'react'
import { useFormStatus } from 'react-dom'

type Props = {
  label: string
  btnProps?: ButtonProps
}

const SubmitButton: FC<Props> = ({ label, ...btnProps }) => {
  const { pending } = useFormStatus()
  return (
    <Button {...btnProps} type="submit" isLoading={pending}>
      {label}
    </Button>
  )
}

export default SubmitButton
