import './App.css'
import FileSelector from './components/FileSelector'
import FileViewer from './components/FileViewer'
import FileTextViewer from './components/FileTextViewer'

function App() {
  return (
    <div className='flex flex-row h-screen items-center m-4 gap-4'>
      <div className='w-1/3 h-screen flex items-center justify-center border-2 border-gray-300 rounded-md'>
        <FileSelector />
      </div>
      <div className='w-2/3 h-screen flex items-center justify-center border-2 border-gray-300 rounded-md'>
        <FileTextViewer />
      </div>
    </div >
  )
}

export default App
