"use client"

import { Button } from "@/components/ui/button"
import { showToast } from "@/utils/toast"
import { Toaster } from "sonner"

export default function Page() {
  return (
    <div className="p-8 space-y-4">
      <Button
        onClick={() => showToast("Login Successful!", { description: "Welcome back!" })}
      >
        Login
      </Button>

      <Button
        onClick={() =>
          showToast("Event Created!", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            actionLabel: "Undo",
            onActionClick: () => console.log("Undo"),
          })
        }
      >
        Create Event
      </Button>

      <Toaster /> 
    </div>
  )
}
