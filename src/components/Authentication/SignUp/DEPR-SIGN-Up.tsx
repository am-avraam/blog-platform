import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import React from 'react'
import { Checkbox as Box } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

import LogForm from './SignUp'

interface IFormInput {
  firstName: string
  lastName: string
  age: number
  checkbox: boolean
}

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`)
}

const Checkbox: React.FC = () => <Box onChange={onChange}>I agree to the processing of my personal information</Box>

const SignUp = () => {
  const { handleSubmit, control, reset, register } = useForm({
    defaultValues: {
      firstName: 'firstName',
      lastName: 'lastName',
      age: 0,
      checkbox: false,
    },
  })
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

  return <LogForm />
}

export default SignUp
