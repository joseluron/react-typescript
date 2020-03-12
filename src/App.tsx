import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AppConstants from './App.constants';
import SignInPage from './pages/SignInPage/SignInPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.scss';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Route path={AppConstants.PAGE_URL_SIGN_IN} exact component={SignInPage}/>
                <ProtectedRoute path={AppConstants.PAGE_URL_DASHBOARD} component={DashboardPage}/>
                <ProtectedRoute path={AppConstants.PAGE_URL_SETTINGS} component={SettingsPage}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
