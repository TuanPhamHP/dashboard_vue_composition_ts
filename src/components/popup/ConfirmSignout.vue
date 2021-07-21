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
      this.$store.commit("CONFIRM_LOGOUT", false);
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
  padding: 24px;
  background: #ffffff;
  border: 0.3px solid #b9b9b9;
  box-sizing: border-box;
  border-radius: 14px;
  border-bottom-left-radius: 14px !important;
  border-bottom-right-radius: 14px !important;
  z-index: 14;
  .header {
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    line-height: 37px;
    letter-spacing: -0.114286px;
    color: #202224;
  }
  .buttons {
    display: flex;
    justify-content: space-around;
    margin: 24px 28px;
    .cancel {
      border: 2px solid #4880ff;
      border-radius: 12px;
      padding: 0 8px;
      font-weight: bold;
      font-size: 14px;
      line-height: 21px;
      height: 36px;
      width: 126px;
      text-align: center;
      letter-spacing: -0.0642857px;
      padding-top: 6px;
      color: #4880ff;
      text-transform: uppercase;
      cursor: pointer;
    }
    .yes {
      border: 1px solid #202224;
      padding: 0 8px;
      height: 36px;
      width: 126px;
      text-transform: uppercase;
      cursor: pointer;
      background: #4880ff;
      mix-blend-mode: normal;
      opacity: 0.9;
      border-radius: 12px;
      font-weight: bold;
      font-size: 14px;
      line-height: 21px;
      padding-top: 6px;
      text-align: center;
      letter-spacing: -0.0642857px;

      color: #ffffff;
    }
  }
}
</style>
