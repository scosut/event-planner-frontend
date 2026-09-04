import { matchPath, useLocation, Routes, Route } from 'react-router';
import Navbar from './Navbar';
import Welcome from '../pages/Welcome';
import Dancers from '../pages/Dancers';
import AddDancer from '../pages/AddDancer';
import EditDancer from '../pages/EditDancer';
import Seating from '../pages/Seating';
import Materials from '../pages/Materials';
import NotFound from '../pages/NotFound';

const Header = () => {
    const location = useLocation();
    const match = matchPath('/', location.pathname);

    return (
        <>
            <header id="header" className={match ? 'fadeIn' : 'secondary'}>
                <Navbar />
                {match && <Welcome />}
            </header>
            <Routes>
                <Route path="/" element={null} />
                <Route path="/dancers" element={<Dancers />} />
                <Route path="/dancers/add" element={<AddDancer />} />
                <Route path="/dancers/edit/:id" element={<EditDancer />} />
                <Route path="/seating" element={<Seating />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default Header;
