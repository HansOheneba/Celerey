'use client'
import Welcome from '../Features/auth/components/templates/welcome'
import AuthLayout from '../Features/auth/components/templates/authLayout'
import FormProvider from '../context/form'
import PublicLayoutTemplate from '@/Features/auth/components/templates/publicLayoutTemplate'

export default function WelcomePage() {
  return (
    <AuthLayout>
      <FormProvider>
        <PublicLayoutTemplate>
          <Welcome />
        </PublicLayoutTemplate>
      </FormProvider>
    </AuthLayout>
  )
}
