<template>
    <div class="max-w-3xl mx-auto p-4">
        <div>
            <select v-model="selectedSituation" class="mb-4" name="" id="">
                <option value="">すべて</option>
                <option value="backlog">未対応</option>
                <option value="processing">対応中</option>
                <option value="completion">完了</option>
            </select>
        </div>
        <div v-for="contact in filteredContacts " :key="contact.id" class="bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-shadow duration-50">
            <router-link :to="{name: 'ListDetail', params: {id: contact.id}}" class="block">
                <div>
                  <p v-if="contact.situation === 'backlog'" class="text-red-600 font-bold text-center">未対応</p>
                  <p v-else-if="contact.situation === 'processing'" class="text-yellow-600 font-bold text-center">対応中</p>
                  <p v-else-if="contact.situation === 'completion'" class="text-green-600 font-bold text-center">完了</p>
                </div>
                <p class="text-lg font-semibold text-gray-800">お名前：{{ contact.name }}</p>
                <p class="text-sm text-gray-600">メールアドレス：{{ contact.mail }}</p>
                <p class="text-sm text-gray-600">電話番号：{{ contact.number }}</p>
                <p class="text-sm text-gray-600">製品種別：{{ contact.type }}</p>
                <p class="text-sm text-gray-600">お問い合わせ内容：{{ truncateContent(contact.content,100) }}</p>
                <p class="text-xs text-gray-500 mt-2">お問い合わせ時間：{{ contact.timestamp.toDate().toLocaleString() }}</p>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { computed, onMounted, ref } from "vue";
import { db } from "../firebase";

const contacts = ref([]);
const selectedSituation = ref("");

onMounted(() => {
    const contactArray = [];
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, orderBy("timestamp", "asc"));
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            contactArray.push({
                id: doc.id,
                name: doc.data().name,
                mail: doc.data().mail,
                number: doc.data().number,
                type: doc.data().type,
                content: doc.data().content,
                timestamp: doc.data().timestamp,
                situation: doc.data().situation,
            });
        });
        contacts.value = contactArray;
        console.log(contacts.value); // データをログに出力して確認
    });
});

const truncateContent = (content, length) => {
    if (content.length <= length) return content;
    return content.substring(0, length) + '...';
}

const filteredContacts = computed(() => {
    if (!selectedSituation.value) {
        return contacts.value;
    }else{
        return contacts.value.filter(contact => contact.situation === selectedSituation.value);
    }
});
</script>

