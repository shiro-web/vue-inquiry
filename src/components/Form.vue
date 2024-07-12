<template setup>
    <div>
        <h1>お問い合わせ</h1>
        <form @submit="handleSubmit">
            <div>
                <label for="name">お名前</label>
                <input type="text" id="name" v-model="name">
            </div>
            <div>
                <label for="mail">メールアドレス</label>
                <input type="mail" id="mail" v-model="mail">
            </div>
            <div>
                <label for="number">電話番号</label>
                <input type="text" id="number" v-model="number">
            </div>
            <div>
                <label for="type">製品種別</label>
                <select name="type" id="type" v-model="type">
                    <option value="A001">A001</option>
                    <option value="A002">A002</option>
                    <option value="A003">A003</option>
                    <option value="A004">A004</option>
                    <option value="A005">A005</option>
                    <option value="A006">A006</option>
                    <option value="A007">A007</option>
                    <option value="A008">A008</option>
                    <option value="A009">A009</option>
                    <option value="A0010">A0010</option>
                    <option value="A0011">A0011</option>
                    <option value="A0012">A0012</option>
                    <option value="A0013">A0013</option>
                    <option value="A0014">A0014</option>
                    <option value="A0015">A0015</option>
                    <option value="A0016">A0016</option>
                </select>
            </div>
            <div>
                <label for="content">お問い合わせ内容</label>
                <textarea name="content" id="content" cols="30" rows="10" v-model="content"></textarea>
            </div>
            <button>送信</button>
        </form>
    </div>
</template>
<script setup>
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase';

const name = ref("");
const mail = ref("");
const number = ref("");
const type = ref("");
const content = ref("");


const handleSubmit =  async(e) => {
    e.preventDefault();
    const docRef = collection(db, "users");
    try{
        await addDoc(docRef, {
            name: name.value,
            mail: mail.value,
            number: number.value,
            type: type.value,
            content: content.value,
            timestamp: new Date()
        })
    }catch(e){
        console.error(e)
    }
}


</script>
<style lang="">
    
</style>