<template>
  <v-dialog v-model="logoutIsOpen" persistent max-width="500px">
    <v-card>
      <v-card-title class="header py-5">
        <p class="mb-0 py-5">Do you really want to Sign out?</p>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="cancel" class="cancel"> Cancel </v-btn>
        <v-btn text @click="signOut" class="yes"> Yes </v-btn>
      </v-card-actions>
      <!-- <div class="sign-out">
        <div class="header">Do you really want to Sign out?</div>
        <div class="buttons">
          <div class="cancel" @click="cancel">Cancel</div>
          <div class="yes" @click="signOut">Yes</div>
        </div>
      </div> -->
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from "@vue/composition-api";
import { mapState } from "vuex";
import store from "@/store";
export default defineComponent({
  setup: () => {
    return {};
  },
  watch: {},
  computed: {
    ...mapState({
      logoutIsOpen: (state: any): boolean => state.logoutIsOpen,
    }),
  },
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
@import "@/assets/style/_variables.scss";
.header {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  line-height: 37px;
  letter-spacing: -0.114286px;
  color: $primaryBlack;
}
.cancel {
  border: 2px solid $primaryText;
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
  color: $primaryText;
  text-transform: uppercase;
  cursor: pointer;
}
.yes {
  border: 1px solid $primaryText;
  padding: 0 8px;
  height: 36px;
  width: 126px;
  text-transform: uppercase;
  cursor: pointer;
  background: $primaryText;
  mix-blend-mode: normal;
  opacity: 0.9;
  border-radius: 12px;
  font-weight: bold;
  font-size: 14px;
  line-height: 21px;
  padding-top: 6px;
  text-align: center;
  letter-spacing: -0.0642857px;

  color: $primaryWhite;
}
</style>
