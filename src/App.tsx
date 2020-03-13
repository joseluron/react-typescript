import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AppConstants from './App.constants';
import SignInPage from './pages/SignInPage/SignInPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { firebaseAuth } from './config/Firebase';
import { isUserSignedIn } from './redux/actions/Authentication';
import './App.scss';

interface IAppProps {
    isUserSignedIn: Function;
}

const App = (props: IAppProps): JSX.Element => {
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
        const listener = firebaseAuth.onAuthStateChanged(user => {
            const currentUser = user || null;
            console.log("Current user: ", currentUser);

            props.isUserSignedIn(currentUser)
            setLoading(false);
            listener();
        });
    });
    
    return (
        !loading ? (
            <BrowserRouter>
                <div className="app-container page-background">
                    <Route path={AppConstants.PAGE_URL_SIGN_IN} exact component={SignInPage}/>
                    <ProtectedRoute exact path={AppConstants.PAGE_URL_DASHBOARD} component={DashboardPage}/>
                    <ProtectedRoute path={AppConstants.PAGE_URL_SETTINGS} component={SettingsPage}/>
                </div>
            </BrowserRouter>
        ) : (
            <div className="app-container page-background">
                <h1 className="loading-banner">Loading...</h1>
            </div>
        )
    );
}

export default connect(null, { isUserSignedIn })(App);
