import { useState } from 'react'
import { PatientType } from '../../types'
import './PatientModalStyles.scss'
import defaultPic from '../../assets/defaultPic.png'

const PatientModal = ({ patient, onClose, onUpdatePatient }: { patient: PatientType, onClose: () => void, onUpdatePatient: (updatedPatient: PatientType) => void }) => {
  const [name, setName] = useState(patient.name)
  const [website, setWebsite] = useState(patient.website)
  const [avatar, setAvatar] = useState(patient.avatar)
  const [description, setDescription] = useState(patient.description)

  const handleSubmit = () => {
    onUpdatePatient({ ...patient, name, website, avatar, description })
    onClose()
  }

  const handleDeleteAvatar = () => {
    setAvatar(defaultPic)
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
    <div className={`modal-overlay ${patient ? 'visible' : ''}`}>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">Edit Patient</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mt-2 w-full"
        />
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="border p-2 mt-2 w-full"
        />
        <div className="avatar-section mt-2">
          {avatar && (
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div className="avatar-buttons mt-2">
            <button onClick={handleDeleteAvatar} className="bg-red-500 text-white p-2 rounded mr-2">Delete</button>
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadAvatar}
              className="hidden"
              id="upload-avatar"
            />
            <label htmlFor="upload-avatar" className="bg-blue-500 text-white p-2 rounded cursor-pointer">Upload</label>
          </div>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mt-2 w-full"
        />
        <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white p-2 rounded">Save</button>
        <button onClick={onClose} className="mt-2 text-red-500">Cancel</button>
      </div>
    </div>
  )
}

export default PatientModal