import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Available from './pages/Available';
import Loaned from './pages/Loaned';
import Expired from './pages/Expired';
import SportsLayout from './SportsLayout.tsx';
import ItemList from "./pages/itemList.tsx";
import LoanedList from "./pages/LoanedList.tsx";


const SportsRouter = () => {
    return (
        <SportsLayout>
            <Routes>
                <Route path="home" element={<Home />} />
                <Route path="available" element={<Available />} />
                <Route path="loaned" element={<Loaned />} />
                <Route path="expired" element={<Expired />} />
                <Route path="available/item/:id" element={<ItemList />} />
                <Route path="LoanedList" element={<LoanedList />} />
                <Route path="*" element={<Navigate to="home" replace />} />
            </Routes>

        </SportsLayout>
    );
};

export default SportsRouter;
