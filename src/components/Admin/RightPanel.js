import React from 'react'

const RightPanel = () => {
  return (
    <div className="right-panel">
      <div className="right-panel-child" onClick={userManage}>Quản lý người dùng</div>
      <div className="right-panel-child" onClick={bookManage}>Quản lý sách</div>
    </div>
  )
}

export default RightPanel