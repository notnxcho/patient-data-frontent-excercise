import { useState } from 'react'
import AddIcon from '../../assets/icons/addIcon'
import './AppHeaderStyles.scss'
import { PatientType } from '../../types'

const AppHeader = ({ onAddPatient }: { onAddPatient: () => void }) => {
  return (
    <div className='app-header-container'>
      <div className='app-header-content custom-container'>
        <h1 className='text-xl font-bold'>Patient List</h1>
        <div className='options-wrap'>
          <button className='add-button' onClick={onAddPatient}>
            <AddIcon color='white' stroke={1.5} />
            Add patient
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppHeader
