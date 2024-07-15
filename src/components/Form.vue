<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold mb-6">お問い合わせ</h1>
      <form @submit="onSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">お名前</label>
          <input type="text" id="name" v-model="name" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <p class="text-red-500 text-sm">{{ errors.name }}</p>
        </div>
        <div>
          <label for="mail" class="block text-sm font-medium text-gray-700">メールアドレス</label>
          <input type="email" id="mail" v-model="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <p class="text-red-500 text-sm">{{ errors.email }}</p>
        </div>
        <div>
          <label for="number" class="block text-sm font-medium text-gray-700">電話番号</label>
          <input type="text" id="number" v-model="number" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <p class="text-red-500 text-sm">{{ errors.number }}</p>
        </div>
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700">製品種別</label>
          <select name="type" id="type" v-model="type" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
          <p class="text-red-500 text-sm">{{ errors.type }}</p>
        </div>
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">お問い合わせ内容</label>
          <textarea name="content" id="content" cols="30" rows="10" v-model="content" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          <p class="text-red-500 text-sm">{{ errors.content }}</p>
        </div>
        <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">送信</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '../firebase';
import { useRouter } from "vue-router";
import { useField, useForm } from 'vee-validate';
import { object, string } from 'yup';

const schema = object({
  name: string().max(16,"16文字以下にしてください。").required('お名前は必須項目です。'),
  email: string().max(200,"200文字以下にしてください。").required('メールアドレスは必須です。').email('メールアドレスの形式ではありません。'),
  number: string().max(12,"12文字以下にしてください。").required('電話番号は必須項目です。'),
  type: string().required('製品種別は必須項目です。'),
  content: string().max(2000,"2000文字以下にしてください。").required('お問い合わせ内容は必須項目です。'),
});

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: number } = useField('number');
const { value: type } = useField('type');
const { value: content } = useField('content');

const router = useRouter();

const submitForm = async () => {
  const collectionRef = collection(db, "users");
  try {
    const docRef = await addDoc(collectionRef, {
      name: name.value,
      email: email.value,
      number: number.value,
      type: type.value,
      content: content.value,
      timestamp: serverTimestamp(),
      situation: "backlog"
    });
    router.push(`/list/${docRef.id}`);
  } catch (e) {
    console.error(e);
  }
};

const onSubmit = handleSubmit(submitForm);
</script>
