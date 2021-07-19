<template>
 <v-card class="sidebar-card-body">
  <v-btn color="accent" x-small elevation="2" class="btn-toggle-mini" :class="mini ? 'goto-collapse' : 'goto-expand'" @click="toggleMini">
   <v-icon>mdi-chevron-left</v-icon>
  </v-btn>
  <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
   <v-list-item class="px-2">
    <v-list-item-avatar>
     <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
    </v-list-item-avatar>

    <v-list-item-title>John Leider</v-list-item-title>
   </v-list-item>

   <v-divider></v-divider>

   <v-list dense class="bg-transparent">
    <div v-for="side in navField" :key="side.groupText">
     <v-list-group
      v-if="side.isGroup"
      :value="false"
      prepend-icon="mdi-account-circle"
      class="each-items-group"
      :class="side.matchToActive.includes(currentRouteName) ? 'onechild-on-active' : ''"
     >
      <template v-slot:activator>
       <v-list-item-title> {{ side.groupText }}</v-list-item-title>
      </template>

      <v-list-group
       v-for="(child, idx) in side.listChild"
       :key="child + idx"
       :value="false"
       class="each-items"
       no-action
       sub-group
       :class="child.matchToActive.includes(currentRouteName) ? 'sidechick-on-active' : ''"
      >
       <template v-slot:activator>
        <v-list-item-content @click="child.action()">
         <v-list-item-title>{{ child.itemText }}</v-list-item-title>
        </v-list-item-content>
       </template>
      </v-list-group>
     </v-list-group>
     <v-list-item
      v-if="!side.isGroup"
      class="pointer each-items single-group"
      :class="side.matchToActive.includes(currentRouteName) ? 'sidechick-on-active' : ''"
      @click="side.action()"
     >
      <v-list-item-icon>
       <v-icon>mdi-home</v-icon>
      </v-list-item-icon>

      <v-list-item-title>{{ side.groupText }}</v-list-item-title>
     </v-list-item>
    </div>
   </v-list>
  </v-navigation-drawer>
 </v-card>
</template>

<script lang="ts">
 import { reactive, ref, defineComponent } from "@vue/composition-api";
 export default defineComponent({
  name: "SideBar",
  props: {
   sidebarIsCollapse: Boolean,
   toggleColappse: Function,
  },
  setup: () => {
   let drawer = ref<boolean>(true);
   let mini = ref<boolean>(false);
   let currentRouteName = ref<string>("index");
   const setMini = (type: boolean): any => {
    mini.value = type;
   };
   const setDrawer = (type: boolean) => {
    drawer.value = type;
   };
   const setCurrentRouteName = (name: string): any => {
    currentRouteName.value = name;
   };
   return { drawer, mini, currentRouteName, setMini, setDrawer, setCurrentRouteName };
  },
  data() {
   return {
    navField: [
     {
      groupText: "Home",
      isGroup: false,
      matchToActive: ["index"],
      action: () => {
       this.$router.push("/");
      },
     },
     {
      groupText: "About",
      isGroup: false,
      matchToActive: ["about"],
      action: () => {
       this.$router.push("/about");
      },
     },
     {
      groupText: "Action",
      isGroup: true,
      matchToActive: ["table", "report"],
      listChild: [
       {
        itemText: "Report",
        matchToActive: ["report"],
        action: () => {
         this.$router.push("/report");
        },
       },
       {
        itemText: "Table",
        matchToActive: ["table"],
        action: () => {
         this.$router.push("/table");
        },
       },
      ],
     },
    ],
   };
  },
  mounted() {
   const currentName = this.$route.name;
   if (currentName) {
    this.setCurrentRouteName(String(currentName).toLowerCase());
   }
  },
  watch: {
   $route(_newVal) {
    const currentName = _newVal.name;
    if (currentName) {
     this.setCurrentRouteName(String(currentName).toLowerCase());
    }
   },
  },
  methods: {
   toggleMini() {
    this.setMini(!this.mini);
   },
  },
 });
</script>

<style lang="scss">
 @import "@/assets/style/_variables.scss";
 .sidebar-container {
  min-height: 100vh;
  .sidebar-card-body {
   .v-navigation-drawer__content {
    background-color: $variantsColor !important;
   }
   height: 100%;
   position: relative;
   .btn-toggle-mini {
    height: 40px !important;
    border-radius: 100% !important;
    width: 40px;
    z-index: 2;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    &.goto-collapse {
     i {
      transform: rotateZ(180deg);
     }
    }
   }
   .each-items {
    &:hover {
     background-color: $primaryColorLighterLv2;
    }
    &-group {
     .v-list-group__header {
      padding-top: 4px;
      padding-bottom: 4px;
     }
     &:hover {
      .v-list-item.v-list-item--active {
       background-color: $primaryColorLighterLv2;
      }
      .v-list-group__header {
       background-color: transparent !important;
      }
     }
     &.v-list-group.v-list-group--active {
      color: $sidebarText !important;
     }
    }
   }
   .single-group {
    padding-top: 4px;
    padding-bottom: 4px;
   }
   .sidechick-on-active {
    background-color: $primaryColorLighterLv1;
   }
   .onechild-on-active {
    background-color: $primaryColorLighterLv1;
    &.v-list-group--active {
     background-color: transparent !important;
    }
    .v-list-item--active.v-list-group__header {
     background-color: $primaryColorLighterLv1;
    }
   }
  }
 }
</style>
