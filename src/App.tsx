import { PatientProvider, usePatientContext } from './context/patientContext'
import './App.css'
import { PatientType } from './types'
import PatientCard from './components/PatientCard/PatientCard'
import AppHeader from './components/AppHeader/AppHeader'
import { useEffect, useState } from 'react'
import PatientModal from './components/PatientModal/PatientModal'
import { toast } from 'react-toastify'
import SkeletonCard from './components/SkeletonCard/SkeletonCard'

const App = () => {
  const { patients, selectedPatient, setSelectedPatient, isLoading } =
    usePatientContext()
  const [expandedPatientId, setExpandedPatientId] = useState<number | null>(
    null,
  )
  const [localPatients, setLocalPatients] = useState<PatientType[]>([])
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('oldest')

  useEffect(() => {
    setLocalPatients(patients)
  }, [patients])

  const handleEdit = (patient: PatientType) => {
    setSelectedPatient(patient)
  }

  const handleAddPatient = () => {
    setSelectedPatient({
      id: 0,
      name: '',
      website: '',
      avatar: '',
      description: '',
      createdAt: new Date().toISOString(),
    })
  }

  const handleCloseModal = () => {
    setSelectedPatient(null)
  }

  const handleUpdatePatient = (updatedPatient: PatientType) => {
    setLocalPatients(prevPatients => {
      const existingPatientIndex = prevPatients.findIndex(
        patient => patient.id === updatedPatient.id,
      )
      if (existingPatientIndex !== -1) {
        // update existing patient
        const updatedPatients = [...prevPatients]
        updatedPatients[existingPatientIndex] = updatedPatient
        toast.success('Patient edited successfully')
        return updatedPatients
      } else {
        // add new patient to the beginning
        toast.success('Patient added successfully')
        return [updatedPatient, ...prevPatients]
      }
    })
  }

  const handleToggleSortOrder = () => {
    setSortOrder(prev => (prev === 'newest' ? 'oldest' : 'newest'))
  }

  const sortedPatients = [...localPatients].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
  })

  return (
    <div className='App'>
      <AppHeader
        onAddPatient={handleAddPatient}
        onToggleSortOrder={handleToggleSortOrder}
        sortOrder={sortOrder}
      />
      <div className='flex flex-col items-center gap-4 overflow-hidden w-full'>
        <div className='custom-container main-grid mt-[64px]'>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : sortedPatients.map((patient: PatientType) => (
                <PatientCard
                  key={patient.id}
                  patient={patient}
                  isExpanded={expandedPatientId === patient.id}
                  onToggleExpand={() =>
                    setExpandedPatientId(
                      expandedPatientId === patient.id ? null : patient.id,
                    )
                  }
                  onEdit={handleEdit}
                />
              ))}
        </div>
      </div>
      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={handleCloseModal}
          onUpdatePatient={handleUpdatePatient}
        />
      )}
    </div>
  )
}

export default () => (
  <PatientProvider>
    <App />
  </PatientProvider>
)
