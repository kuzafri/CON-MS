<script setup>

import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import api from '@/utils/axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const email = ref('');
const password = ref('');
const checked = ref(false);
const errorMessage = ref('');
const loading = ref(false);

const router = useRouter();

const handleLogin = async () => {
   try {
       loading.value = true;
       const response = await api.post('/users/login', {
           email: email.value,
           password: password.value,
           role: 'organizer'
       });
       
       localStorage.setItem('token', response.data.token);
       localStorage.setItem('user', JSON.stringify(response.data.user));
       
       router.push('/organizer/event');
   } catch (error) {
       errorMessage.value = error.response?.data?.message || 'Login failed';
   } finally {
       loading.value = false;
   }
};
</script>

<template>
    <!-- <FloatingConfigurator /> -->
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div class="w-full border-2 border-surface-2 bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                <div class="text-center mb-8">
                    <div class="text-primary dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Concertify!</div>
                    <span class="text-muted-color font-medium">Sign in to continue</span>
                </div>

                <div>
                    <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                    <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                    <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                    <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                    <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                        <div class="flex items-center">
                            <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                            <label for="rememberme1">Remember me</label>
                        </div>
                        <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                    </div>
            <Button 
                label="Sign In" 
                class="w-full" 
                @click="handleLogin"
                :loading="loading"
                :disabled="loading"
            />                

   <small class="text-red-500 block mt-2" v-if="errorMessage">{{ errorMessage }}</small>

   </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>