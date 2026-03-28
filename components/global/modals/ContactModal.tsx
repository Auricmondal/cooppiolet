'use client'
import React, { useState, useMemo, useContext } from 'react'
import { cn } from '@/lib/utils'
import Modal from './Modal'
import { ModalType, ModalContext } from '@/context/ModalContext'
import { Input, Select, Textarea, Checkbox } from '@/components/ui/Input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'

// 1. Define Form Schema with Zod to match your payload structure mapping
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  code: z.string().min(1, 'Country code is required'),
  phone: z.string().min(1, 'Phone number is required'),
  website: z.string().optional(),
  cooperativeName: z.string().min(1, 'Company name is required'),
  purpose: z.string().min(1, 'Please select a purpose'),
  thoughts: z.string().optional(),
  date: z.string().min(1, 'Preferred date is required'),
  time: z.string().min(1, 'Preferred time is required'),
  accept_privacy_t_n_c: z.boolean().refine((v) => v === true, 'Privacy policy must be accepted'),
})

type ContactFormData = z.infer<typeof contactSchema>

enum STEPS {
  CONTACT = 0,
  ABOUT = 1,
  SCHEDULE = 2,
}

const ContactModal = () => {
  const { isModalOpen, modalType, closeModal } = useContext(ModalContext)
  const [step, setStep] = useState<STEPS>(STEPS.CONTACT)

  const { data: formContent, isLoading: isContentLoading } = useQuery({
    queryKey: ['form-content'],
    queryFn: async () => {
      const res = await axios.get(`/api/forms`)
      return res.data
    },
    enabled: isModalOpen && modalType === ModalType.FORM,
  })

  // 2. Setup react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      code: '49',
      phone: '',
      email: '',
      website: '',
      cooperativeName: '',
      purpose: 'demo',
      thoughts: '',
      date: '',
      time: '',
      accept_privacy_t_n_c: false,
    },

    mode: 'onTouched',
  })

  const {
    mutate: submitLead,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async (formData: ContactFormData) => {
      const payload = {
        data: {
          name: formData.name,
          country_code: parseInt(formData.code) || 0,
          phone: parseInt(formData.phone) || 0,
          email: formData.email,
          website_url: formData.website || '',
          company_name: formData.cooperativeName,
          pupose: formData.purpose, // preserved typo
          comment: formData.thoughts || '',
          date: formData.date,
          time: `${formData.time}:00.000`, // with ms
          accept_privacy_t_n_c: formData.accept_privacy_t_n_c,
        },
      }
      return await axios.post(`/api/forms`, payload)
    },
    onSuccess: () => {
      toast.success('Your request has been successfully submitted!')
      reset()
      setStep(STEPS.CONTACT)
      closeModal()
    },
    onError: (err: any) => {
      console.log(err)

      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        err?.message ||
        'Something went wrong'

      toast.error(msg)
    },
  })

  const onBack = () => {
    if (step === STEPS.CONTACT) return
    setStep((v) => v - 1)
  }

  const goToNextStep = async () => {
    let isValid = false
    if (step === STEPS.CONTACT) {
      isValid = await trigger(['name', 'email', 'phone', 'code'])
    } else if (step === STEPS.ABOUT) {
      isValid = await trigger(['cooperativeName', 'purpose'])
    }

    if (isValid) {
      setStep((v) => v + 1)
    }
  }

  const onSubmitForm = async (data: ContactFormData) => {
    if (step === STEPS.SCHEDULE) {
      submitLead(data)
    }
  }

  const headerContent = useMemo(() => {
    if (isContentLoading || !formContent)
      return { title: 'Loading...', close: true, closeAction: closeModal }

    if (step === STEPS.CONTACT) {
      return {
        title: formContent.customer_info_title,
        description: formContent.customer_info_description,
        close: true,
        closeAction: closeModal,
      }
    }

    if (step === STEPS.ABOUT) {
      return {
        title: formContent.company_details_title,
        description: formContent.company_details_description,
        close: true,
        closeAction: closeModal,
      }
    }

    if (step === STEPS.SCHEDULE) {
      return {
        title: formContent.slot_selection_title,
        description: formContent.slot_selection_description,
        close: true,
        closeAction: closeModal,
      }
    }

    return { title: 'Contact', close: true, closeAction: closeModal }
  }, [step, closeModal, isContentLoading, formContent])

  const labelClass = 'block mb-1.5 text-[13px] text-black/60 font-medium'
  const errorClass = 'text-red-500 text-xs mt-1'

  const renderBody = () => (
    <div className="flex min-h-[200px] flex-col py-2">
      {/* Skeleton for initial fetch */}
      {isContentLoading && (
        <div className="animate-pulse space-y-4">
          <div className="h-2 w-full rounded bg-black/5" />
          <div className="h-10 w-full rounded bg-black/5" />
          <div className="h-10 w-full rounded bg-black/5" />
        </div>
      )}

      {!isContentLoading && (
        <>
          <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
            <div
              className="h-full bg-[#8A154A] transition-all duration-300 ease-in-out"
              style={{ width: `${((step + 1) / 3) * 100}%` }}
            />
          </div>

          {/* STEP 0: CONTACT SALES */}
          <div
            className={cn(
              'animate-in fade-in slide-in-from-right-4 space-y-4 duration-300',
              step !== STEPS.CONTACT && 'hidden'
            )}
          >
            <div>
              <label className={labelClass}>Full Name</label>
              <Input placeholder="John Doe" {...register('name')} />
              {errors.name && <span className={errorClass}>{errors.name.message}</span>}
            </div>
            <div>
              <label className={labelClass}>Contact Number</label>
              <div className="flex gap-2">
                <Input className="w-[30%] text-center" placeholder="49" {...register('code')} />
                <Input
                  className="w-full"
                  placeholder="1234456789"
                  type="tel"
                  {...register('phone')}
                />
              </div>
              {(errors.phone || errors.code) && (
                <span className={errorClass}>{errors.phone?.message || errors.code?.message}</span>
              )}
            </div>
            <div>
              <label className={labelClass}>Email Address</label>
              <Input placeholder="johndoe@me.com" type="email" {...register('email')} />
              {errors.email && <span className={errorClass}>{errors.email.message}</span>}
            </div>
          </div>

          {/* STEP 1: ABOUT YOU */}
          <div
            className={cn(
              'animate-in fade-in slide-in-from-right-4 space-y-4 duration-300',
              step !== STEPS.ABOUT && 'hidden'
            )}
          >
            <div>
              <label className={labelClass}>Website URL</label>
              <Input placeholder="example.com" {...register('website')} />
              {errors.website && <span className={errorClass}>{errors.website.message}</span>}
            </div>
            <div>
              <label className={labelClass}>Company/Cooperative Name</label>
              <Input placeholder="ABC Enterprises" {...register('cooperativeName')} />
              {errors.cooperativeName && (
                <span className={errorClass}>{errors.cooperativeName.message}</span>
              )}
            </div>
            <div>
              <label className={labelClass}>Purpose of Contact</label>
              <Select
                {...register('purpose')}
                options={
                  formContent?.Purposes || [
                    { value: 'demo', label: 'Software Demo' },
                    { value: 'pricing', label: 'Pricing Inquiry' },
                    { value: 'other', label: 'Other' },
                  ]
                }
                className="appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.5%204.5L6%208L9.5%204.5%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat pr-10"
              />
              {errors.purpose && <span className={errorClass}>{errors.purpose.message}</span>}
            </div>
            <div>
              <label className={labelClass}>Comments/Thoughts</label>
              <Textarea
                {...register('thoughts')}
                className="min-h-[100px] resize-none"
                placeholder="Is there anything we should keep in mind?"
              />
            </div>
          </div>

          {/* STEP 2: SCHEDULE */}
          <div
            className={cn(
              'animate-in fade-in slide-in-from-right-4 space-y-4 duration-300',
              step !== STEPS.SCHEDULE && 'hidden'
            )}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Preferred Date</label>
                <Input type="date" {...register('date')} />
                {errors.date && <span className={errorClass}>{errors.date.message}</span>}
              </div>
              <div>
                <label className={labelClass}>Preferred Time</label>
                <Input placeholder="00:00" type="time" {...register('time')} />
                {errors.time && <span className={errorClass}>{errors.time.message}</span>}
              </div>
            </div>

            <div className="border-t border-black/5 pt-4">
              <Checkbox
                label="I accept the Privacy Policy and Terms and Conditions"
                {...register('accept_privacy_t_n_c')}
              />
              {errors.accept_privacy_t_n_c && (
                <p className={errorClass}>{errors.accept_privacy_t_n_c.message}</p>
              )}
            </div>

            {isError && (
              <div className="mt-4 rounded-lg bg-red-100/50 p-3 text-sm font-medium text-red-600">
                {error?.message || 'Submission failed'}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )

  if (!isModalOpen || modalType !== ModalType.FORM) return null

  return (
    <Modal
      type={ModalType.FORM}
      isBlocking={true}
      position="center"
      header={headerContent}
      footer={{
        primaryBtn: {
          label: step === STEPS.SCHEDULE ? (isPending ? 'Processing...' : 'Submit') : 'Next',
          onClick: step === STEPS.SCHEDULE ? handleSubmit(onSubmitForm) : goToNextStep,
        },
        secondaryBtn: step !== STEPS.CONTACT ? { label: 'Back', onClick: onBack } : undefined,
      }}
    >
      {renderBody()}
    </Modal>
  )
}

export default ContactModal

//   return <></>
// }

// export default ContactModal
