import AddIcon from '../../assets/icons/addIcon'
import './AppHeaderStyles.scss'

const AppHeader = ({
  onAddPatient,
  onToggleSortOrder,
  sortOrder,
}: {
  onAddPatient: () => void
  onToggleSortOrder: () => void
  sortOrder: 'newest' | 'oldest'
}) => {
  return (
    <div className='app-header-container'>
      <div className='app-header-content custom-container'>
        <h1 className='text-xl font-bold'>Patient List</h1>
        <div className='options-wrap'>
          <button className='sort-button' onClick={() => onToggleSortOrder()}>
            Sort by: {sortOrder === 'oldest' ? 'Oldest' : 'Newest'}
          </button>
          <button className='add-button' onClick={onAddPatient}>
            <AddIcon color='white' stroke={1.5} />
            <span>Add patient</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
