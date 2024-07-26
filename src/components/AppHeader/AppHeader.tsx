import './AppHeaderStyles.scss'

const AppHeader = () => {
  return (
    <div className="app-header-container">
      <div className="app-header-content custom-container">
        <h1 className="text-xl font-bold">Patient List</h1>
        <div className="options-wrap"></div>
      </div>
    </div>
  )
}

export default AppHeader