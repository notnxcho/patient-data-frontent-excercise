import { PatientType } from '../../types'
import './PatientCardStyles.scss'
import { useInView } from 'react-intersection-observer'
import EditIcon from '../../assets/icons/editIcon'
import { formatDate } from '../../utils/common'
import defaultPic from '../../assets/defaultPic.png'

const PatientCard = ({
  patient,
  isExpanded,
  onToggleExpand,
  onEdit,
}: {
  patient: PatientType
  isExpanded: boolean
  onToggleExpand: () => void
  onEdit: (patient: PatientType) => void
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-20px 0px',
  })

  const handleEdit = () => {
    onEdit(patient)
  }

  return (
    <div className={`patient-card-container ${inView ? 'in-view' : 'hide-in-view'}`} ref={ref}>
      <div className='patient-header'>
        <img src={patient.avatar || defaultPic} alt={`${patient.name}'s avatar`} className='patient-avatar' />
        <div className='flex flex-col gap-1'>
          <div className='patient-name'>{patient.name}</div>
          {patient.website && (
            <div className='website-chip'>
              <a href={patient.website} target='_blank' className='text-gray-500'>
                {patient.website}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className={`patient-description ${isExpanded ? '' : 'collapsed'}`} onClick={onToggleExpand}>
        {patient.description}
      </div>
      <div className='patient-footer'>
        <div className='creation-date'>{formatDate(patient.createdAt)}</div>
        <button onClick={handleEdit} className='edit-button'>
          <EditIcon color='white' />
          Edit
        </button>
      </div>
    </div>
  )
}

export default PatientCard
