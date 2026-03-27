'use client'
import React, { useCallback, useState } from 'react'

enum STEPS {
  INFO = 0,
  CONTACT = 1,
  SLOTBOOKING = 2,
}

const ContactModal = () => {
  const [step, setStep] = useState(STEPS.INFO)

  const onBack = useCallback(() => {
    setStep((value) => value - 1)
  }, [])
  const onNext = useCallback(() => {
    setStep((value) => value + 1)
  }, [])

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext()
    }
  }, [step, onNext])

  // const bodyContent = (

  // );

  return <></>
}

export default ContactModal
