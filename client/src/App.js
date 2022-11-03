import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { checkAuth } from './api/userSlice';
import { useEffect } from 'react';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { Spinner } from 'react-bootstrap';

function App() {
    const isLoading = useSelector((state) => state.user.isLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, []);

    if (isLoading) {
        return <Spinner animation='grow' />;
    }
    return (
        <Router>
            <NavBar />
            <AppRouter />
        </Router>
    );
}

export default App;
