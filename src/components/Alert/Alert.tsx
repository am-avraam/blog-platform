import React from 'react'
import { Alert, Space } from 'antd'

const Error: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%', paddingBottom: '100px' }}>
      <Alert
        message="Произошла ошибка"
        type="error"
        style={{ width: '100%', height: '184px', display: 'flex', alignItems: 'center' }}
      />
    </Space>
  )
}

export default Error
