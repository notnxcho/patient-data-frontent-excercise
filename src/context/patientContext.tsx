import React, { createContext, useContext, ReactNode, useState } from 'react'
import { usePatients } from '../hooks/usePatients'
import { PatientType } from '../types'
import { Slide, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface PatientContextType {
  patients: PatientType[]
  selectedPatient: PatientType | null
  setSelectedPatient: (patient: PatientType | null) => void
  addPatient: (patient: PatientType) => void
  updatePatient: (patient: PatientType) => void
  isLoading: boolean
}

const PatientContext = createContext<PatientContextType | undefined>(undefined)

export const PatientProvider = ({ children }: { children: ReactNode }) => {
  const { data: patients = [], isLoading } = usePatients()
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(
    null,
  )

  const addPatient = (patient: PatientType) => {
    // no apis to call
    toast.success('Patient added successfully')
  }

  const updatePatient = (updatedPatient: PatientType) => {
    // no apis to call
    toast.success('Patient updated successfully')
  }

  return (
    <PatientContext.Provider
      value={{
        patients,
        selectedPatient,
        setSelectedPatient,
        addPatient,
        updatePatient,
        isLoading,
      }}
    >
      {children}
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme='dark'
        transition={Slide}
      />
    </PatientContext.Provider>
  )
}

export const usePatientContext = () => {
  const context = useContext(PatientContext)
  if (!context) {
    throw new Error('usePatientContext must be used within a PatientProvider')
  }
  return context
}
