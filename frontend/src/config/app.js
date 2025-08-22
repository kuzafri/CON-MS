// App configuration
export const appConfig = {
    // Set to true to use dummy data instead of backend
    useDummyData: true,
    
    // Backend API configuration
    backend: {
        enabled: false,
        baseUrl: '',
        timeout: 10000
    },
    
    // App settings
    app: {
        name: 'CON-MS',
        version: '1.0.0',
        description: 'Concert Management System'
    }
};

export default appConfig;
