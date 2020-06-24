import React, { useState } from 'react' 

const Admin = () => {
  const accountTableHeader = ['Id', 'Email', 'Admin', 'Registered Day', 'Action']
  const bookTableHeader = ['Id', 'Name', 'Author', 'Number of Chapters', 'Time', 'Action']

  const [ header, setHeader ] = useState('Quản lý người dùng')
  const [ addButtonMessage, setAddButtonMessage ] = useState('Thêm người dùng')
  const [ tableHeader, setTableHeader ] = useState(accountTableHeader)
  const [ tableContent, setTableContent ] = useState([])

  const userManage = () => {
    setHeader('Quản lý người dùng')
    setAddButtonMessage('Thêm người dùng')
    setTableHeader(accountTableHeader)
  }

  const bookManage = () => {
    setHeader('Quản lý sách')
    setAddButtonMessage('Thêm sách')
    setTableHeader(bookTableHeader)
  }

  const handleClickArrow = (e) => {
    const rightPanel = document.getElementById('right-panel-content')
    const leftPanel = document.getElementById('left-panel')
    if (e.target.classList.value === 'left-arrow') {
      e.target.setAttribute('class', 'right-arrow')
      rightPanel.setAttribute('class', 'right-panel-hide')
    }
    else {
      e.target.setAttribute('class', 'left-arrow')
      rightPanel.setAttribute('class', 'right-panel-show')
    }
  }

  const handleAddAccount = () => {
    const popUpScreen = document.getElementById('new-account-pop');
    popUpScreen.setAttribute('class', '')
  }

  const handleRemoveAddAccount = () => {
    const popUpScreen = document.getElementById('new-account-pop');
    popUpScreen.setAttribute('class', 'show-none')
  }

  const handleDeleteAccount = () => {
    console.log('hi')
  }

  const chooseTableHeader = () => {
    return tableHeader.map((header) => {
      return (
        <th>{header}</th>
      )
    })
  }

  const accounts = [{id: 1, email: 'thuylinh7720@gmail.com', admin: false, registered: '12th Jul 2020'}]

  const getTableContent = () => {
    return accounts.map((account) => {
      return (
        <tr>
          <th>{account.id}</th>
          <th>{account.email}</th>
          <th>no</th>
          <th>{account.registered}</th>
          <th>
            <div className="bin" onClick={handleDeleteAccount}></div>
          </th>
        </tr>
      )
    })
  }

  return (
    <div id="admin-container" className="show-flex">
      <div id="new-account-pop" className="show-none">
        <div>Tạo người dùng mới</div>
        <div>
          Email
        </div>
        <div>Password</div>
        <div>

        </div>
        <div className="show-flex">
          <div>Xác nhận</div>
          <div>Hủy</div>
        </div>
      </div>

      <div id="right-panel" className="show-flex">
        <div className="left-arrow" onClick={handleClickArrow}></div>
        <div id="right-panel-content" className="right-panel-show">
          <div className="right-panel-child" onClick={userManage}>Quản lý người dùng</div>
          <div className="right-panel-child" onClick={bookManage}>Quản lý sách</div>
        </div>
      </div>
      <div id="left-panel">
        <div className="left-panel-header">
          {header}
        </div>
        <div id="add-button" className="show-flex" onClick={handleAddAccount}>
          <div id="add-icon"></div>
          <div>{addButtonMessage}</div>
        </div>

        <div className="left-panel-table">
          <table>
            <thead>
              <tr>
                {chooseTableHeader()}
              </tr>
            </thead>
            <tbody>
              {getTableContent()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Admin