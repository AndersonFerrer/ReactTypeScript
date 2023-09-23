import { NavLink } from 'react-router-dom'
import '../App.css'
import Logo from '../assets/vite.svg'
import { FiUsers } from 'react-icons/fi'
import { FaComments } from 'react-icons/fa'

export default function Sidebar() {
    return (
        <aside className='sidebar'>
            <img width={64} src={Logo} alt="logo" />
            <nav className='sidebar__navbar'>
                <ul>
                    <NavLink className={({ isActive, isPending }) =>
                        isPending ? "sidebar__links" : isActive ? "sidebar__links sidebar__links--active" : "sidebar__links"
                    } to='/'>
                        <FiUsers />Usuarios
                    </NavLink>
                    <NavLink className={({ isActive, isPending }) =>
                        isPending ? "sidebar__links" : isActive ? "sidebar__links sidebar__links--active" : "sidebar__links"
                    } to='/comments'>
                        <FaComments />Comentarios
                    </NavLink>
                </ul>
            </nav>
        </aside>
    )
}
