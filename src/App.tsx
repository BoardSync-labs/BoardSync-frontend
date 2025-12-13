import './App.css'
// import { Toaster } from "@/components/ui/sonner"
import AppLayout from './components/AppLayout'
import Page  from './pages/Demo'  


function App() {
  return (
    <>
      <AppLayout>
        {/* <h1>Welcome to the demo</h1> */}
        <Page />
        
      </AppLayout>
    </>
  )
}

export default App
