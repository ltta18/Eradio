import React, { useState } from 'react' 

const Admin = () => {
  const accountTableHeader = ['Id', 'Email', 'Admin', 'Registered Day', 'Action']
  const bookTableHeader = ['Id', 'Name', 'Author', 'Number of Chapters', 'Time', 'Action']

  const [ header, setHeader ] = useState('Quản lý người dùng')
  const [ addButtonMessage, setAddButtonMessage ] = useState('Thêm người dùng')
  const [ tableHeader, setTableHeader ] = useState(accountTableHeader)
  const [ tableContent, setTableContent ] = useState([])

  const userManage = () => {
    const userManage = document.getElementById('user-manage')
    const bookManage = document.getElementById('book-manage')
    userManage.classList.add('orange-text')
    bookManage.classList.remove('orange-text')
    setHeader('Quản lý người dùng')
    setAddButtonMessage('Thêm người dùng')
    setTableHeader(accountTableHeader)
  }

  const bookManage = () => {
    const userManage = document.getElementById('user-manage')
    const bookManage = document.getElementById('book-manage')
    bookManage.classList.add('orange-text')
    userManage.classList.remove('orange-text')
    setHeader('Quản lý sách')
    setAddButtonMessage('Thêm sách')
    setTableHeader(bookTableHeader)
  }

  const handleClickArrow = (e) => {
    const rightPanel = document.getElementById('right-panel')
    const rightPanelContent = document.getElementById('right-panel-content')
    const leftPanel = document.getElementById('left-panel')
    if (e.target.classList.value === 'left-arrow') {
      e.target.setAttribute('class', 'right-arrow')
      rightPanelContent.setAttribute('class', 'right-panel-hide')
      rightPanel.style.width = '5%'
      leftPanel.style.marginLeft = '0'
    }
    else {
      e.target.setAttribute('class', 'left-arrow')
      rightPanelContent.setAttribute('class', 'right-panel-show')
      rightPanel.style.width = ''
      leftPanel.style.marginLeft = ''
    }
  }

  const handleAddAccount = () => {
    const popUpScreen = document.getElementById('new-account-pop');
    const filter = document.getElementById('filter');
    popUpScreen.setAttribute('class', '')
    filter.classList.remove('show-none');
    filter.style.position = 'absolute';
  }

  const handleDeleteAccount = () => {
    console.log('hi')
  }

  const handleClickOutside = () => {
    const filter = document.getElementById('filter');
    const popUpScreen = document.getElementById('new-account-pop');
    popUpScreen.setAttribute('class', 'show-none')
    filter.classList.add('show-none');
    filter.style.position = '';
  }

  const chooseTableHeader = () => {
    return tableHeader.map((header) => {
      return (
        <th>{header}</th>
      )
    })
  }

  const accounts = [{id: 1, email: 'thuylinh7720@gmail.com', admin: false, registered: '12th Jul 2020'},
  {id: 1, email: 'thuylinh7720@gmail.com', admin: false, registered: '12th Jul 2020'}]

  const getTableContent = () => {
    return accounts.map((account,i) => {
      console.log(i%2)
      return (
        <tr className={i%2 === 0 ? '' : 'tr-highlight'}>
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

      <div id="filter" className="filter" onClick={handleClickOutside}></div>

      <div id="right-panel" className="show-flex">
        <div className="left-arrow" onClick={handleClickArrow}></div>
        <div id="right-panel-content" className="right-panel-show">
          <div id="user-manage" className="right-panel-child orange-text" onClick={userManage}>Quản lý người dùng</div>
          <div id="book-manage" className="right-panel-child" onClick={bookManage}>Quản lý sách</div>
        </div>
      </div>
      <div id="left-panel">
        <h2 className="left-panel-header">
          {header}
        </h2>
        <div id="add-button" className="show-flex" onClick={handleAddAccount}>
          <div id="add-icon"></div>
          <div id="button-message">{addButtonMessage}</div>
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