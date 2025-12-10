import './App.css'
// import { Toaster } from "@/components/ui/sonner"
import AppLayout from './components/AppLayout'
import ToastButton from './components/Toast'


function App() {
  return (
    <>
      <AppLayout>
        <ToastButton />
        {/* <Toaster /> */}
      </AppLayout>
    </>
  )
}

export default App
