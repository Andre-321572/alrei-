import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export const useSwal = () => {
  // Instance SweetAlert stylisée selon la charte graphique de la plateforme
  const customSwal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-main px-4 py-2 rounded-pill mx-1 fw-bold shadow-sm',
      cancelButton: 'btn btn-outline-secondary px-4 py-2 rounded-pill mx-1 fw-bold',
      denyButton: 'btn btn-danger px-4 py-2 rounded-pill mx-1 fw-bold',
      popup: 'rounded-4 shadow-lg border-0 p-4',
      title: 'fw-bold text-dark fs-4 mb-2',
      htmlContainer: 'text-muted fs-6 mb-3'
    },
    buttonsStyling: false
  })

  // Instance Toast pour notifications discrètes en haut à droite
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3500,
    timerProgressBar: true,
    didOpen: (toastElement) => {
      toastElement.addEventListener('mouseenter', Swal.stopTimer)
      toastElement.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const success = (title: string, text?: string) => {
    return customSwal.fire({
      icon: 'success',
      title,
      text,
      iconColor: '#198754'
    })
  }

  const error = (title: string, text?: string) => {
    return customSwal.fire({
      icon: 'error',
      title,
      text,
      iconColor: '#dc3545'
    })
  }

  const warning = (title: string, text?: string) => {
    return customSwal.fire({
      icon: 'warning',
      title,
      text,
      iconColor: '#ffc107'
    })
  }

  const confirm = async (options: {
    title: string
    text: string
    confirmButtonText?: string
    cancelButtonText?: string
  }) => {
    const result = await customSwal.fire({
      icon: 'warning',
      title: options.title,
      text: options.text,
      showCancelButton: true,
      confirmButtonText: options.confirmButtonText || 'Oui, confirmer',
      cancelButtonText: options.cancelButtonText || 'Annuler',
      reverseButtons: true
    })
    return result.isConfirmed
  }

  const notifySuccess = (message: string) => {
    return toast.fire({
      icon: 'success',
      title: message
    })
  }

  const notifyError = (message: string) => {
    return toast.fire({
      icon: 'error',
      title: message
    })
  }

  return {
    swal: customSwal,
    toast,
    success,
    error,
    warning,
    confirm,
    notifySuccess,
    notifyError
  }
}
