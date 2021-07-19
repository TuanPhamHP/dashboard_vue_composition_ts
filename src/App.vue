<template>
 <v-app>
  <v-main>
   <router-view :key="this.$route.fullPath" />
  </v-main>
  <v-snackbar v-model="snackbarEnable" v-show="snackbarState.content" :class="snackBarClasViaType">
   <p class="snack-title mb-1">
    {{ snackbarState.title }}
   </p>
   {{ snackbarState.content }}

   <template v-slot:action="{ attrs }">
    <v-btn color="blue" text v-bind="attrs" @click="snackbarEnable = false" class="snackbar-btn-close"> Close </v-btn>
   </template>
  </v-snackbar>
 </v-app>
</template>

<script lang="ts">
 import Vue from "vue";
 import { mapState } from "vuex";

 export default Vue.extend({
  name: "App",

  data: () => ({
   snackbarEnable: true,
  }),
  computed: {
   ...mapState({
    snackbarState: (state: any) => state.snackbar,
   }),
   snackBarClasViaType() {
    if (!this.snackbarState || !this.snackbarState.type) {
     return "";
    }
    return `snackbar-on-${this.snackbarState.type}`;
   },
  },
  watch: {
   snackbarState: {
    deep: true,
    handler() {
     this.snackbarEnable = true;
    },
   },
  },
 });
</script>
<style lang="scss">
 @import "@/assets/style/main.scss";
</style>
