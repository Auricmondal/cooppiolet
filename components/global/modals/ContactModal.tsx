'use client'
import React, { useCallback, useState, useMemo } from 'react'
import Modal from './Modal'
import { ModalType } from '@/context/ModalContext'
import { Input, Select, Textarea } from '@/components/ui/Input'

enum STEPS {
  CONTACT = 0,
  ABOUT = 1,
  SCHEDULE = 2,
}

const ContactModal = () => {
  const [step, setStep] = useState<STEPS>(STEPS.CONTACT)
  const [isLoading, setIsLoading] = useState(false)

  const onBack = useCallback(() => {
    if (step === STEPS.CONTACT) return
    setStep((value) => value - 1)
  }, [step])

  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.SCHEDULE) {
      return onNext()
    }

    // Final Submission Logic
    setIsLoading(true)
    console.log('Submitting lead...')
    // await apiCall()
    setIsLoading(false)
  }, [step, onNext])

  // 1. Dynamic Header Logic
  const headerContent = useMemo(() => {
    const defaultDesc = 'We are here to answer your queries!'
    switch (step) {
      case STEPS.CONTACT:
        return {
          title: 'Contact Sales',
          description: defaultDesc,
          close: true,
        }
      case STEPS.ABOUT:
        return {
          title: 'Could You Tell Us more about You?',
          description: defaultDesc,
          close: true,
        }
      case STEPS.SCHEDULE:
        return {
          title: 'What time suit you the best?',
          description: defaultDesc,
          close: true,
        }
      default:
        return { title: 'Get Started', close: true }
    }
  }, [step])

  // Reusable input class for consistency

  const labelClass = 'block mb-1.5 text-[13px] text-black/60'

  // 2. Dynamic Body Content
  const bodyContent = (
    <div className="flex min-h-[200px] flex-col py-2">
      {/* Progress Bar */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full bg-[#8A154A] transition-all duration-300 ease-in-out"
          style={{ width: `${((step + 1) / 3) * 100}%` }}
        />
      </div>

      {/* STEP 0: CONTACT SALES */}
      {step === STEPS.CONTACT && (
        <div className="animate-in fade-in slide-in-from-right-4 space-y-4 duration-300">
          <div>
            <label className={labelClass}>Name</label>
            <Input placeholder="John Doe" />
          </div>

          <div>
            <label className={labelClass}>Contact</label>
            <div className="flex gap-2">
              <Input className={`w-[20%] text-center`} placeholder="+44" />

              <Input className={`w-full`} placeholder="1234456789" type="tel" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <Input placeholder="johndoe@me.com" type="email" />
          </div>
        </div>
      )}

      {/* STEP 1: ABOUT YOU */}
      {step === STEPS.ABOUT && (
        <div className="animate-in fade-in slide-in-from-right-4 space-y-4 duration-300">
          <div>
            <label className={labelClass}>Website</label>
            <Input placeholder="abccoops.com" />
          </div>

          <div>
            <label className={labelClass}>Cooperative Name</label>
            <Input placeholder="ABC Coops" />
          </div>

          <div>
            <label className={labelClass}>Purpose</label>
            <Select
              options={[
                { value: 'demo', label: 'Software Demo' },
                { value: 'pricing', label: 'Pricing Inquiry' },
                { value: 'other', label: 'Other' },
              ]}
              className={`appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M2.5%204.5L6%208L9.5%204.5%22%20stroke%3D%22black%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_12px_center] bg-no-repeat pr-10`}
            />
          </div>

          <div>
            <label className={labelClass}>Add your thoughts</label>
            <Textarea
              className={`min-h-[100px] resize-none`}
              placeholder="Is there anything we should keep in mind?"
            />
          </div>
        </div>
      )}

      {/* STEP 2: SCHEDULE */}
      {step === STEPS.SCHEDULE && (
        <div className="animate-in fade-in slide-in-from-right-4 space-y-4 duration-300">
          <div>
            <label className={labelClass}>Date</label>
            <Input type="date" />
          </div>

          <div>
            <label className={labelClass}>Time</label>
            <Input placeholder="00:00" type="time" />
          </div>
        </div>
      )}
    </div>
  )

  return (
    <Modal
      type={ModalType.FORM}
      isBlocking={true}
      position="center"
      // Note: You will need to pass the Header Image down from Strapi via the `Image` prop here if dynamic,
      // or hardcode it in the Modal component if it's static.
      header={headerContent}
      footer={{
        primaryBtn: {
          label: step === STEPS.SCHEDULE ? (isLoading ? 'Processing...' : 'Submit') : 'Next',
          onClick: onSubmit,
        },
        // We hide the secondary button on the first and last step to match your designs
        secondaryBtn:
          step != STEPS.CONTACT
            ? {
                label: 'Back',
                onClick: onBack,
              }
            : undefined,
      }}
    >
      {bodyContent}
    </Modal>
  )
}

export default ContactModal
