"use client"  // must be a client component

import { toast } from "sonner"

interface ToastOptions {
  description?: string
  actionLabel?: string
  onActionClick?: () => void
}

export function showToast(
  message: string,
  options?: ToastOptions
) {
  toast(message, {
    description: options?.description,
    action: options?.actionLabel
      ? { label: options.actionLabel, onClick: options.onActionClick }
      : undefined,
  })
  return null
}
