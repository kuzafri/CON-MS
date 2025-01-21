<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref } from 'vue';
import axios from '@/utils/axios';
import { useRouter } from 'vue-router';


const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const cpassword = ref('');
const checked = ref(false);
const errorMessage = ref('');

const register = async () => {
    if (password.value !== cpassword.value) {
        errorMessage.value = 'Passwords do not match!';
        return;
    }
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
            name: name.value,
            email: email.value,
            password: password.value,
            role: 'admin'  // Specify admin role
        });

        // If registration is successful, redirect to admin login page
        if (response.status === 201) {
            router.push('/admin/auth/login');
        }
    } catch (error) {
        if (error.response) {
            errorMessage.value = error.response.data.message;
        } else {
            errorMessage.value = 'An error occurred during registration';
        }
    }
};
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div class="w-full border-2 border-surface-2 bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                <div class="text-center mb-8">
                    <div class="text-primary dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Concertify!</div>
                    <span class="text-muted-color font-medium">Register to continue</span>
                </div>

                <div>
                    <label for="name1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Name</label>
                    <InputText id="name1" type="text" placeholder="Name" class="w-full md:w-[30rem] mb-8" v-model="name" />

                    <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                    <InputText id="email1" type="text" placeholder="Email Address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                    <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                    <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                    <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Confirm Password</label>
                    <Password id="cpassword1" v-model="cpassword" placeholder="Confirm Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                    <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                        <div class="flex items-center">
                            <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                            <label for="rememberme1">Remember me</label>
                        </div>
                    </div>
                    <Button label="Register Account" class="w-full" @click="register"></Button>
                    <div v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</div>
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
