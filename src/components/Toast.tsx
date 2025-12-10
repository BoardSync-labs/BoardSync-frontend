

import { toast } from "sonner"

export default function ToastButton() {
  return (
    <button
      onClick={() => {
        toast("Hello Sanket! Your toast is working 🚀")
      }}
    >
      Show Toast
    </button>
  )
}
