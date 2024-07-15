import { onAuthStateChanged } from 'firebase/auth';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from './firebase';

export const useAuthStore = defineStore('auth', () => {
    const adminUser = ref(null);
    const loginCheck = () => {
        onAuthStateChanged(auth, (currentUser) => {
            if(currentUser){
                adminUser.value = currentUser;
            } else {
                adminUser.value = null;
            }
            console.log(adminUser.value); // 追加: ユーザーの状態が変更されたことを確認
        });
    }

    // 初期化時に必ずログインチェックを実行
    loginCheck();

    return { adminUser, loginCheck }
});
