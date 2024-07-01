//react-router-dom
import { Outlet } from 'react-router-dom'

//components
import { Navbar } from '../components'

function MainLayout() {
  return (
    <div>
      <Navbar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default MainLayout
