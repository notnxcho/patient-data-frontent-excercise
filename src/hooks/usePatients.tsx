import { useQuery } from '@tanstack/react-query'
import { apiRoutes } from '../constants/routes'

const fetchPatients = async () => {
  const response = await fetch(apiRoutes.patients)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const usePatients = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchPatients,
  })
}
