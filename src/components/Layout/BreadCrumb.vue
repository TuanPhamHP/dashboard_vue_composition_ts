<template>
 <div class="w-100 px-3">
  <v-breadcrumbs :items="currentBreadcrumb" class="px-0">
   <template v-slot:divider>
    <v-icon>mdi-chevron-right</v-icon>
   </template>
   <template v-slot:item="{ item }">
    <v-breadcrumbs-item :disabled="item.disabled" @click.prevent="handleBreadClick(item)" class="each-breadcum">
     {{ item.text }}
    </v-breadcrumbs-item>
   </template>
  </v-breadcrumbs>
 </div>
</template>

<script lang="ts">
 import Vue from "vue";
 import { mapState } from "vuex";
 export default Vue.extend({
  computed: {
   ...mapState({
    currentBreadcrumb: (state: any): any => state.currentBreadcrumb,
   }),
  },
  methods: {
   handleBreadClick: (_data: Record<string, unknown>) => {
    if (_data.disabled) {
     return;
    }
    console.log(_data);
   },
  },
 });
</script>

<style lang="scss">
 @import "@/assets/style/_variables.scss";
 .each-breadcum {
  /* color: ; */
 }
</style>
