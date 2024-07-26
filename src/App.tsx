import { PatientProvider, usePatientContext } from './context/patientContext'
import './App.css';
import { PatientType } from './types'
import PatientCard from './components/PatientCard/PatientCard';
import AppHeader from './components/AppHeader/AppHeader';
import { useEffect, useState } from 'react';
import PatientModal from './components/PatientModal/PatientModal';

const App = () => {
  const { patients } = usePatientContext()
  const [expandedPatientId, setExpandedPatientId] = useState<number | null>(null)
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(null)
  const [localPatients, setLocalPatients] = useState<PatientType[]>([])

  useEffect(()=> {
    setLocalPatients(patients)
  }, [patients])

  const handleEdit = (patient: PatientType) => {
    setSelectedPatient(patient)
  }

  const handleCloseModal = () => {
    setSelectedPatient(null)
  }

  const handleUpdatePatient = (updatedPatient: PatientType) => {
    setLocalPatients(localPatients.map(patient => patient.id === updatedPatient.id ? updatedPatient : patient))
  }

  return (
    <div className="App">
      <AppHeader/>
      <div className="custom-container grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-6 mt-[64px] px-3 py-6">
        {localPatients.map((patient: PatientType) => (
          <PatientCard 
            key={patient.id} 
            patient={patient} 
            isExpanded={expandedPatientId === patient.id}
            onToggleExpand={() => setExpandedPatientId(expandedPatientId === patient.id ? null : patient.id)}
            onEdit={handleEdit}
          />
        ))}
      </div>
      {selectedPatient && (
        <PatientModal patient={selectedPatient} onClose={handleCloseModal} onUpdatePatient={handleUpdatePatient} />
      )}
    </div>
  );
};

export default () => (
  <PatientProvider>
    <App />
  </PatientProvider>
);