import { useQuery } from '@tanstack/react-query';

const fetchPatients = async () => {
  const response = await fetch('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users')
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const usePatients = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchPatients
  })
}
