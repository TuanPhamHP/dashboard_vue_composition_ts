<template>
 <div class="w-100 top-marker">
  <h4 class="m-0 bread-header px-4 pt-2 pointer" @click="toggleMini"><img src="../../assets/images/menu_black_24dp.svg" alt="" /></h4>
  <div class="header-user-btn">
   <v-row justify="space-around">
    <v-menu :rounded="'0'" offset-y :close-on-click="true">
     <template v-slot:activator="{ attrs, on }">
      <v-btn class="btn-user-m" v-bind="attrs" v-on="on">
       <img src="../../assets/images/gpe_logo.png" class="user-avatar-m" alt="" />
       <p class="user-info">
        <span class="user-info-name">{{ user.name }}</span>
        <span class="user-info-pos">{{ "position" }}</span>
       </p>
       <img src="../../assets/images/sidebar-icon/more-expand-icon.svg" alt="" />
      </v-btn>
     </template>

     <v-list>
      <v-list-item v-for="item in items" :key="item.text" link>
       <v-list-item-title v-text="item.text" @click="item.action()"></v-list-item-title>
      </v-list-item>
     </v-list>
    </v-menu>
   </v-row>
  </div>
  <ConfirmSignout v-if="logoutIsOpen"></ConfirmSignout>
 </div>
</template>

<script lang="ts">
 import Vue from "vue";
 import { mapState } from "vuex";
 import ConfirmSignout from "@/components/popup/ConfirmSignout.vue";
 export default Vue.extend({
  components: { ConfirmSignout },
  data() {
   return {
    items: [
     {
      text: "Sign Out",
      action: () => {
       this.$store.commit("CONFIRM_LOGOUT", true);
      },
     },
    ],
   };
  },
  computed: {
   ...mapState({
    user: (state: any) => state.auth.user,
    logoutIsOpen: (state: any): boolean => state.logoutIsOpen,
    isMini: (state: any): boolean => state.isMini,
   }),
  },
  methods: {
   toggleMini() {
    this.$store.commit("SET_MINI", !this.isMini);
   },
  },
 });
</script>

<style lang="scss" scopped>
 @import "@/assets/style/_variables.scss";
 .top-marker {
  height: 58px;
  background-color: #fff !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .bread-header {
   /* color: #fff; */
   font-weight: 400;
  }
 }
 .header-user-btn {
  .btn-user-m {
   height: unset !important;
   color: $GPEdarkText;
   box-shadow: none !important;
   border: none !important;
   background-color: transparent !important;
   &:hover,
   &:focus,
   &:active,
   &:focus-within {
    &::before {
     display: none;
    }
   }
   .user-avatar-m {
    width: 44px;
    height: 44px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
   }
   .user-info {
    text-transform: capitalize;
    width: fit-content;
    margin-bottom: 0;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    padding: 0px 16px;
    &-name {
     text-transform: capitalize;
     white-space: nowrap;
     font-style: normal;
     font-weight: bold;
     font-size: 14px;
     line-height: 16px;
     color: $GPEdarkText;
    }
    &-pos {
     text-transform: capitalize;
     white-space: nowrap;
     font-style: normal;
     font-weight: normal;
     margin-top: 4px;
     font-size: 12px;
     line-height: 14px;
     color: $GPEgrayText;
    }
   }
  }
 }
</style>
