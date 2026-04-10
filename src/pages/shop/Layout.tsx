import { Outlet } from 'react-router-dom'
import Breadcrumbs from '../../components/reusable/Breadcrumps'

const Layout = () => {
    return (
        <div>
            <Breadcrumbs />
            <Outlet />
        </div>
    )
}

export default Layout