<template>
 <DefaultLayout>
  <button @click="randomUser">Add User</button>
  <div v-for="user in arrList" :key="user.id">
   <p>Name:{{ user.name }}</p>
   <p>Age:{{ user.age }}</p>
   <p>ID:{{ user.id }}</p>
   <p>Address:{{ user.address }}</p>
  </div>
  <button @click="getAllRoles">aaa</button>
 </DefaultLayout>
</template>

<script lang="ts">
 import { reactive, ref, defineComponent } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue";
 import api from "@/services";
 export default defineComponent({
  name: "Home",
  components: {
   DefaultLayout,
  },
  setup: () => {
   interface userDefine {
    name: string;
    age: number;
    id: number;
    address: string;
   }

   let arrList = reactive<userDefine[]>([]);
   const instanceOfUserDefine = (user: userDefine): user is userDefine => {
    return "name" in user;
   };
   const userDefinePush: any = (user: userDefine) => {
    if (instanceOfUserDefine(user)) {
     arrList.push(user);
    }
   };

   return { arrList, userDefinePush };
  },
  watch: {},
  methods: {
   randomUser() {
    const user = {
     name: [],
     age: Math.round(Math.random() * 26),
     id: Math.round(Math.random() * 999),
     address: Math.round(Math.random() * 2) > 1 ? "Hai Phong" : null,
     zxc: 111,
    };
    this.userDefinePush(user);
   },
   async getAllRoles() {
    const res = await api.roles.getAll({});
   },
  },
 });
</script>
