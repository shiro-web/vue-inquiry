<template>
    <div class="max-w-md mx-auto mt-10">
        <form class="p-6 bg-white rounded-lg shadow-md">
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">メールアドレス</label>
                <input 
                    type="email" 
                    id="email" 
                    v-model="email"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="example@example.com"
                >
            </div>
            <div class="mb-6">
                <label for="password" class="block text-gray-700 text-sm font-bold mb-2">パスワード</label>
                <input 
                    type="password" 
                    id="password" 
                    v-model="password"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="********"
                >
            </div>
            <div class="flex items-center justify-center">
                <button 
                    type="button" 
                    @click="handleEmailPasswordLogin"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    ログイン
                </button>
            </div>
        </form>
    </div>
</template>
<script setup>
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase";


const email = ref("");
const password = ref("");
const router = useRouter();

const handleEmailPasswordLogin = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("ログインに成功");
            router.push("/list");
        })
        .catch((error) => {
            console.error(error);
            alert("ログインに失敗しました。");
        })
}
</script>
