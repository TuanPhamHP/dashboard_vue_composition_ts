<template>
 <div class="container-fluid-t layout-default">
  <div class="sidebar-container">
   <keep-alive>
    <SideBar :sidebar-is-collapse="sidebarIsCollapse" :toggle-colappse="toggleColappse" />
   </keep-alive>
  </div>
  <div class="rest-container">
   <TopMarker />
   <BreadCrumb v-if="showBC" />
   <keep-alive>
    <slot></slot>
   </keep-alive>
  </div>
 </div>
</template>

<script>
 import SideBar from "@/components/Layout/Sidebar.vue";
 import TopMarker from "@/components/Layout/TopMarker.vue";
 import BreadCrumb from "@/components/Layout/BreadCrumb.vue";
 export default {
  components: { SideBar, TopMarker, BreadCrumb },
  data() {
   return {
    sidebarIsCollapse: false,
    viewWidth: 1920,
    showBC: true,
   };
  },
  mounted() {
   this.viewWidth = window.outerWidth;
   if (this.$route.fullPath.includes("/login")) {
    this.showBC = false;
   }
  },
  methods: {
   toggleColappse() {
    this.sidebarIsCollapse = !this.sidebarIsCollapse;
   },
  },
 };
</script>

<style lang="scss">
 .layout-default {
  display: flex;
 }
 .rest-container {
  padding: 0;
  width: 100%;
 }
</style>
