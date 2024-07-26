import React, { createContext, useContext, ReactNode } from 'react'
import { usePatients } from '../hooks/usePatients'
import { PatientType } from '../types'

interface PatientContextType {
  patients: PatientType[];
  addPatient: (patient: PatientType) => void;
  updatePatient: (patient: PatientType) => void;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const PatientProvider = ({ children }: { children: ReactNode }) => {
  const { data: patients = [], refetch } = usePatients()

  const addPatient = (patient: PatientType) => {
    // Logic to add patient
  };

  const updatePatient = (updatedPatient: PatientType) => {
    // Logic to update patient
  };

  return (
    <PatientContext.Provider value={{ patients, addPatient, updatePatient }}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatientContext must be used within a PatientProvider');
  }
  return context;
};