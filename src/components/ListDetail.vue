<template>
    <div class="w-96 mx-auto bg-blue-200 p-4 h-screen flex flex-col">
        <div class="flex-1 overflow-y-auto mb-4">
            <div v-if="adminUser">
                <button 
                        @click="handleStart" 
                        v-if="users.situation === 'backlog'"
                        class="w-1/2 bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition">
                        対応開始
                    </button>
                    <button 
                        @click="handleComplete" 
                        v-if="users.situation === 'processing'"
                        class="w-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition">
                        対応完了
                    </button>
                    <button 
                        @click="handleReset" 
                        v-if="users.situation === 'processing' || users.situation === 'completion'"
                        class="w-1/2 bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition">
                        未対応に戻す
                    </button>
                <p v-if="users.situation === 'backlog'" class="text-red-600 font-bold text-center">未対応</p>
                <p v-else-if="users.situation === 'processing'" class="text-yellow-600 font-bold text-center">対応中</p>
                <p v-else-if="users.situation === 'completion'" class="text-green-600 font-bold text-center">完了</p>
            </div>
            <div v-for="message in messages" :key="message.id" class="mb-4 flex">
                <p
                :class="[
                    'max-w-xs text-black p-3 rounded-lg shadow',
                    adminUser && message.role === 'admin' ? 'ml-auto bg-green-300' : '',
                    adminUser && message.role !== 'admin' ? 'mr-auto bg-white' : '',
                    !adminUser && message.role === 'admin' ? 'mr-auto bg-white' : '',
                    !adminUser && message.role !== 'admin' ? 'ml-auto bg-green-300' : ''
                ]"
                >
                    {{ message.message }}
                </p>
            </div>
        </div>
        <form @submit="handleSendMessage" class="flex items-center space-x-4">
            <input :readonly="adminUser && users.situation == 'backlog'" v-model="newMessage" type="text" class="flex-1 bg-white border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm" placeholder="メッセージを入力">
            <button class="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">送信</button>
        </form>
    </div>
</template>

<script setup>
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { createPinia } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { db } from "../firebase";
import { useAuthStore } from '../store';

const newMessage = ref("");
const messages = ref([]);
const users = ref([]);
const route = useRoute();
const id = route.params.id;
const authStore = useAuthStore();
const adminUser = authStore.adminUser;

onMounted(() => {
  const collectionRef = collection(db, "users", id, "messages");
  const q = query(collectionRef, orderBy("timestamp", "asc"));
  onSnapshot(q, (querySnapshot) => {
    messages.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      message: doc.data().message,
      role: doc.data().role,
      timestamp: doc.data().timestamp,
      situation: doc.data().situation,
    }));
    console.log(messages.value); // データをログに出力して確認
  });
});

onMounted(() => {
    const docRef = doc(db, "users", id);
    onSnapshot(docRef, (docSnapshot) => {
      users.value = {
        id: docSnapshot.id,
        ...docSnapshot.data(),
      };
    console.log(users.value)
    });
});

const handleSendMessage = async (e) => {
  e.preventDefault();
  if(newMessage.value.length == 0){
    return
  }
  const collectionRef = collection(db, "users", id, "messages");
  try {
    await addDoc(collectionRef, {
      message: newMessage.value,
      timestamp: serverTimestamp(),
      role: adminUser ? "admin" : "general"
    });
    newMessage.value = ""; // メッセージ送信後に入力フィールドをクリア
  } catch (e) {
    console.error(e);
  }
};

const handleStart = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", id);
    try {
    await updateDoc(docRef, {
      situation:"processing"
    });
    newMessage.value = ""; // メッセージ送信後に入力フィールドをクリア
  } catch (e) {
    console.error(e);
  }
}

const handleComplete = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", id);
    try {
    await updateDoc(docRef, {
      situation:"completion"
    });
    newMessage.value = ""; // メッセージ送信後に入力フィールドをクリア
  } catch (e) {
    console.error(e);
  }
}

const handleReset  = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "users", id);
    try {
    await updateDoc(docRef, {
      situation:"backlog"
    });
    newMessage.value = ""; // メッセージ送信後に入力フィールドをクリア
  } catch (e) {
    console.error(e);
  }
}
</script>

