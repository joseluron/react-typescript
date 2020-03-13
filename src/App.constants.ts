class AppConstants {
    public static readonly PAGE_URL_SIGN_IN = '/sign-in';
    public static readonly PAGE_URL_DASHBOARD = '/';
    public static readonly PAGE_URL_SETTINGS = '/settings';

    public static readonly APP_NAVIGATION = [
        {
            linkTo: 'dashboard',
            path: AppConstants.PAGE_URL_DASHBOARD
        },
        {
            linkTo: 'settings',
            path: AppConstants.PAGE_URL_SETTINGS
        }
    ];
}

export default AppConstants;
