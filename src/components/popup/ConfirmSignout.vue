<template>
 <div class="sign-out">
  <div class="header">Do you really want to Sign out?</div>
  <div class="buttons">
   <div class="cancel" @click="cancel">Cancel</div>
   <div class="yes" @click="signOut">Yes</div>
  </div>
 </div>
</template>

<script lang="ts">
 import { reactive, ref, defineComponent } from "@vue/composition-api";
 import store from "@/store";
 export default defineComponent({
  setup: () => {
   return {};
  },
  watch: {},
  methods: {
   signOut() {
    localStorage.removeItem("auth._token.local");
    store.commit("SET_LOGOUT_USER");
    this.$router.push("/login");
   },
   cancel() {
    this.$store.commit("CONFIRM_LOGOUT", false);
   },
  },
 });
</script>
<style lang="scss" scoped>
 .sign-out {
  position: absolute;
  top: 30%;
  left: 800px;
  width: 400px;
  border: 1px solid #202224;
  padding: 24px;
  background-color: #ffffff;
  z-index: 14;
  border-radius: 4px;
  .header {
   text-align: center;
  }
  .buttons {
   display: flex;
   justify-content: space-around;
   margin: 24px 28px;
   .cancel {
    border: 1px solid #202224;
    padding: 0 8px;
    text-transform: uppercase;
    cursor: pointer;
   }
   .yes {
    border: 1px solid #202224;
    padding: 0 8px;
    text-transform: uppercase;
    cursor: pointer;
   }
  }
 }
</style>
