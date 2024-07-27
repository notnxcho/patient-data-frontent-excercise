import { useEffect, useState } from 'react'
import { PatientType } from '../../types'
import './PatientModalStyles.scss'
import defaultPic from '../../assets/defaultPic.png'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import FocusTrap from 'focus-trap-react'

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    website: yup.string().url('Website must be a valid URL'),
    description: yup.string().required('Description is required'),
    avatar: yup.string(),
  })
  .required()

type Inputs = yup.InferType<typeof schema>

const PatientModal = ({
  patient,
  onClose,
  onUpdatePatient,
}: {
  patient: PatientType
  onClose: () => void
  onUpdatePatient: (updatedPatient: PatientType) => void
}) => {
  const [animateClose, setAnimateClose] = useState(false)
  const [resetShake, setResetShake] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: patient,
  })

  const handleLocalSubmit = () => {
    setResetShake(true)
    setTimeout(() => {
      setResetShake(false)
    }, 0)
  }

  const handleLocalOnClose = () => {
    setAnimateClose(true)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  const onSubmit: SubmitHandler<Inputs> = data => {
    onUpdatePatient({ ...patient, ...data })
    handleLocalOnClose()
  }

  const handleDeleteAvatar = () => {
    setValue('avatar', '')
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSubmit(onSubmit)()
      } else if (event.key === 'Escape') {
        handleLocalOnClose()
      }
    }

    if (patient) {
      document.body.classList.add('no-scroll')
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [patient, handleSubmit, onSubmit, handleLocalOnClose])

  const handleUploadAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = event => {
        if (event.target && event.target.result) {
          setValue('avatar', event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <FocusTrap>
      <div className={`modal-overlay ${patient && !animateClose ? 'visible' : 'hidden'}`} onClick={handleLocalOnClose}>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col grow items-center justify-center'>
          <div className='modal-container' onClick={e => e.stopPropagation()}>
            <h2 className='text-xl font-semibold'>{patient.name ? 'Edit Patient' : 'Add Patient'}</h2>
            <div className='avatar-section my-4'>
              <img src={watch('avatar') || defaultPic} alt='Avatar' className='w-24 h-24 rounded-full object-cover' />
              <div className='avatar-buttons'>
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  id='upload-avatar'
                  onChange={handleUploadAvatar}
                />
                <label
                  htmlFor='upload-avatar'
                  className='bg-black text-white py-2 px-3 rounded-lg font-medium cursor-pointer hover:bg-[#303030]'
                >
                  Upload new
                </label>
                {watch('avatar') && (
                  <button onClick={handleDeleteAvatar} className='text-red-500'>
                    Delete
                  </button>
                )}
              </div>
            </div>
            <input
              type='text'
              {...register('name')}
              placeholder='Patient name'
              className={errors.name && !resetShake ? 'shake' : ''}
            />
            {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
            <input
              type='text'
              {...register('website')}
              placeholder='Website address'
              className={errors.website && !resetShake ? 'shake' : ''}
            />
            {errors.website && <p className='text-red-500'>{errors.website.message}</p>}
            <div className='desc-wrapper-container'>
              <textarea
                placeholder='Description'
                style={{ resize: 'none' }}
                {...register('description')}
                className={errors.description && !resetShake ? 'shake' : ''}
              />
            </div>
            {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
            <div className='flex flex-col gap-3 mt-4'>
              <button
                type='submit'
                onClick={handleLocalSubmit}
                className='bg-black text-white py-3 font-semibold rounded-lg text-lg hover:bg-[#303030]'
              >
                Save changes
              </button>
              <div
                onClick={handleLocalOnClose}
                className='flex cursor-pointer justify-center text-red-500 text-lg py-3 rounded-lg font-semibold hover:bg-[#f2f2f2]'
              >
                Cancel
              </div>
            </div>
          </div>
        </form>
      </div>
    </FocusTrap>
  )
}

export default PatientModal
