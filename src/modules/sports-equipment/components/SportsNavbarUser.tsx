import { NavLink } from 'react-router-dom';

const SportsNavbarUser = () => {
    const linkClasses = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 ${
            isActive
                ? 'text-orange-800 border-b-2 border-orange-800'
                : 'text-gray-700 hover:text-orange-600'
        }`;

    return (
        <nav className="flex space-x-4 border-b border-gray-200 bg-white px-4 py-4 text-sm font-medium">
            <NavLink to="/modules/sports/home" className={linkClasses}>
                Bienvenido
            </NavLink>
            <NavLink to="/modules/sports/available" className={linkClasses}>
                Articulos Disponibles
            </NavLink>
            <NavLink to="/modules/sports/Loaned" className={linkClasses}>
                Calendario de Prestamos
            </NavLink>
            <NavLink to="/modules/sports/Expired" className={linkClasses}>
                Articulos Vencidos
            </NavLink>
            <NavLink to="/modules/sports/LoanedList" className={linkClasses}>
                Articulos en Prestamo
            </NavLink>

        </nav>
    );
};

export default SportsNavbarUser;
