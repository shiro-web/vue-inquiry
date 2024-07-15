<template>
    <div class="flex items-center justify-end mt-4">
        <button @click="handleLogout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            ログアウト
        </button>
    </div>
</template>

<script setup>
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const handleLogout = () => {

signOut(auth).then(() => {
 
}).catch((error) => {
    console.error(error)
});
}
</script>
