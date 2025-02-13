'use client'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // Style for nprogress
import { useEffect } from 'react'

NProgress.configure({
  showSpinner: false,
  easing: 'ease',
  speed: 600,
  trickleSpeed: 100,
  minimum: 0.2,
})

const ProgressLoading = () => {
  useEffect(() => {
    NProgress.start()

    return () => {
      NProgress.done()
    }
  }, [])

  return null
}

export default ProgressLoading
