import { ref } from 'vue';

export function useAuth() {
    const user = ref(null);
    const isAuthenticated = ref(false);
    const loading = ref(true);

    // Initialize auth state
    const initAuth = async () => {
        try {
            const response = await fetch('/api/auth/me', {
                credentials: 'include' // Include cookies in the request
            });
            
            if (response.ok) {
                const userData = await response.json();
                user.value = userData;
                isAuthenticated.value = true;
            } else {
                user.value = null;
                isAuthenticated.value = false;
            }
        } catch (error) {
            console.error('Auth initialization error:', error);
            user.value = null;
            isAuthenticated.value = false;
        } finally {
            loading.value = false;
        }
    };

    // Login function
    const login = async (credentials) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials),
                credentials: 'include'
            });

            if (response.ok) {
                const userData = await response.json();
                user.value = userData;
                isAuthenticated.value = true;
                return { success: true };
            } else {
                const error = await response.json();
                return { success: false, error: error.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Login failed' };
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            user.value = null;
            isAuthenticated.value = false;
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Check if user has required permissions
    const hasPermission = (permission) => {
        return user.value?.permissions?.includes(permission) ?? false;
    };

    // Initialize auth state when composable is first used
    initAuth();

    return {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        hasPermission,
        initAuth
    };
} 