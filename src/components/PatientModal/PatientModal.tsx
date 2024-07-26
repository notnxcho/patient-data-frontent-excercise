import { useState } from 'react'
import { PatientType } from '../../types'
import './PatientModalStyles.scss'
import defaultPic from '../../assets/defaultPic.png'

const PatientModal = ({ patient, onClose, onUpdatePatient }: { patient: PatientType, onClose: () => void, onUpdatePatient: (updatedPatient: PatientType) => void }) => {
  const [name, setName] = useState(patient.name)
  const [website, setWebsite] = useState(patient.website)
  const [avatar, setAvatar] = useState(patient.avatar)
  const [description, setDescription] = useState(patient.description)
  const [animateClose, setAnimateClose] = useState(false)
  const [errors, setErrors] = useState<{ name?: string, website?: string, description?: string }>({})

  const validateInputs = () => {
    const newErrors: { name?: string, website?: string, description?: string } = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (website && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(website)) newErrors.website = 'Invalid website URL'
    if (!description.trim()) newErrors.description = 'Description is required'
    return newErrors
  }

  const handleSubmit = () => {
    setErrors({})
    setTimeout(()=> {
      const validationErrors = validateInputs()
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        return
      }
      onUpdatePatient({ ...patient, name, website, avatar, description })
      handleLocalOnClose()
    }, 0)
  }

  const handleDeleteAvatar = () => {
    setAvatar('')
  }

  const handleLocalOnClose = () => {
    setAnimateClose(true)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setAvatar(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div className={`modal-overlay ${patient && !animateClose ? 'visible' : 'hidden'}`} onClick={handleLocalOnClose}>
      <div className="modal-container" onClick={(e)=>e.stopPropagation()}>
        <h2 className="text-xl font-semibold">{patient.name ? 'Edit Patient' : 'Add Patient'}</h2>
        <div className="avatar-section my-4">
          <img
            src={avatar || defaultPic}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />          
          <div className="avatar-buttons">
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadAvatar}
              className="hidden"
              id="upload-avatar"
            />
            <label htmlFor="upload-avatar" className="bg-black text-white py-2 px-3 rounded-lg font-medium cursor-pointer hover:bg-[#303030]">Upload new</label>
            { avatar && <button onClick={handleDeleteAvatar} className="text-red-500">Delete</button>}
          </div>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Patient name'
          className={errors.name && 'shake'}
        />
        {errors.name && <p className="text-red-500">{errors.name}</p>}
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder='Website address'
          className={errors.website && 'shake'}
        />
        {errors.website && <p className="text-red-500">{errors.website}</p>}
        <div className="desc-wrapper-container">
          <textarea
            placeholder='Description'
            style={{ resize: 'none' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={errors.description && 'shake'}
          />
        </div>
        {errors.description && <p className="text-red-500">{errors.description}</p>}
        <div className='flex flex-col gap-3 mt-4'>
          <button onClick={handleSubmit} className="bg-black text-white py-3 font-semibold rounded-lg text-lg hover:bg-[#303030]">Save changes</button>
          <button onClick={handleLocalOnClose} className="text-red-500 text-lg py-3 rounded-lg font-semibold hover:bg-[#f2f2f2]">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default PatientModal