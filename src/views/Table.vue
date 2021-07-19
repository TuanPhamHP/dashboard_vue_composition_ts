<template>
 <DefaultLayout>
  <div class="px-3">
   <ContainerTablePage />
  </div>
 </DefaultLayout>
</template>

<script lang="ts">
 import { reactive, ref, defineComponent } from "@vue/composition-api";
 import DefaultLayout from "@/layouts/default.vue";
 import api from "@/services";
 import ContainerTablePage from "@/components/containers/ContainerTablePage.vue";
 import useOrder from "@/utils/uses/snackbar/useOrder";
 export default defineComponent({
  components: {
   DefaultLayout,
   ContainerTablePage,
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
   const { orderCreate, orderUpdate } = useOrder();

   const userDefinePush: any = (user: userDefine) => {
    if (instanceOfUserDefine(user)) {
     arrList.push(user);
    }
   };

   return { arrList, userDefinePush, orderCreate, orderUpdate };
  },
  watch: {},
  methods: {
   tryTestSnack() {
    this.orderCreate("success");
   },
  },
 });
</script>
