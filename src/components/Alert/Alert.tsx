import React from 'react'
import { Alert, Space } from 'antd'
import { useSelector } from 'react-redux'

import { State } from '../../models/stateTypes'

const Error: React.FC = () => {
  const { error } = useSelector((state: State) => state.posts)

  return (
    <Space direction="vertical" style={{ width: '100%', paddingBottom: '100px' }}>
      <Alert
        message="Произошла ошибка"
        // description="не найдено."
        type="error"
        style={{ width: '100%', height: '184px', display: 'flex', alignItems: 'center' }}
      />
    </Space>
  )
}

export default Error
