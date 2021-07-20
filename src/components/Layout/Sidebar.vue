<template>
  <v-card class="sidebar-card-body bg-white">
    <v-btn
      color="accent"
      x-small
      elevation="2"
      class="btn-toggle-mini"
      :class="mini ? 'goto-collapse' : 'goto-expand'"
      @click="toggleMini"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent>
      <v-list-item class="px-2">
        <router-link to="/" class="sidebar-logo-link">
          <img
            v-if="!mini"
            src="../../assets/images/sidebar-icon/logo_type.png"
            class="sidebar-logo pointer"
            alt=""
          />

          <img
            v-if="mini"
            src="../../assets/images/sidebar-icon/logo_type_mini.png"
            class="sidebar-logo pointer"
            alt=""
          />
        </router-link>
      </v-list-item>

      <!-- <v-divider></v-divider> -->

      <v-list
        dense
        class="bg-transparent body-sidebar-dense"
        :class="mini ? 'body-sidebar-dense-mini' : ''"
      >
        <div v-for="side in navField" :key="side.groupText">
          <v-list-group
            v-if="side.type !== 'divider' && side.isGroup"
            :value="false"
            prepend-icon="mdi-account-circle"
            class="each-items-group"
            :class="
              side.matchToActive.includes(currentRouteName)
                ? 'onechild-on-active'
                : ''
            "
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
              :class="
                child.matchToActive.includes(currentRouteName)
                  ? 'sidechick-on-active'
                  : ''
              "
            >
              <template v-slot:activator>
                <v-list-item-content @click="child.action()">
                  <v-list-item-title>{{ child.itemText }}</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-group>
          </v-list-group>
          <v-list-item
            v-if="side.type !== 'divider' && !side.isGroup"
            class="pointer each-items single-group"
            :class="[
              side.matchToActive.includes(currentRouteName)
                ? 'sidechick-on-active'
                : '',
              mini ? 'each-items-on-menu' : '',
            ]"
            @click="side.action()"
          >
            <v-list-item-icon>
              <v-icon v-if="!mini">mdi-home</v-icon>
              <v-tooltip v-if="mini" right>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-bind="attrs" v-on="on">mdi-home</v-icon>
                </template>
                <span>{{ side.groupText }}</span>
              </v-tooltip>
            </v-list-item-icon>

            <v-list-item-title>{{ side.groupText }}</v-list-item-title>
          </v-list-item>
          <v-divider v-if="side.type === 'divider'"></v-divider>
        </div>
      </v-list>
    </v-navigation-drawer>
    <ConfirmSignout></ConfirmSignout>
  </v-card>
</template>

<script lang="ts">
import { reactive, ref, defineComponent } from "@vue/composition-api";
import ConfirmSignout from "@/components/popup/ConfirmSignout.vue";
import store from "@/store";
export default defineComponent({
  name: "SideBar",
  props: {
    sidebarIsCollapse: Boolean,
    toggleColappse: Function,
  },
  components: { ConfirmSignout },
  setup: () => {
    let signOut = ref<boolean>(false);
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
    const handleLogout = () => {
      alert("Logout clicked");
    };

    return {
      drawer,
      mini,
      currentRouteName,
      setMini,
      setDrawer,
      setCurrentRouteName,
      handleLogout,
    };
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
          groupText: "User Guide",
          isGroup: false,
          matchToActive: ["about"],
          action: () => {
            this.$router.push("/about");
          },
        },
        {
          groupText: "Order",
          isGroup: false,
          matchToActive: ["order"],
          action: () => {
            this.$router.push("/order");
          },
        },
        {
          groupText: "Bag",
          isGroup: false,
          matchToActive: ["bag"],
          action: () => {
            this.$router.push("/bag");
          },
        },
        {
          groupText: "Manifest",
          isGroup: false,
          matchToActive: ["manifest"],
          action: () => {
            this.$router.push("/manifest");
          },
        },
        {
          groupText: "Invoice",
          isGroup: false,
          matchToActive: ["invoice"],
          action: () => {
            this.$router.push("/invoice");
          },
        },
        {
          groupText: "Reports",
          isGroup: false,
          matchToActive: ["reports"],
          action: () => {
            this.$router.push("/reports");
          },
        },
        {
          type: "divider",
        },
        {
          groupText: "Sign Out",
          isGroup: false,
          matchToActive: ["none"],
          action: (): void => {
            //  localStorage.removeItem("auth._token.local");
            //  store.commit("SET_LOGOUT_USER");
            //  this.$router.push("/login");
            console.log("alaba trap");
          },
        },
        //  {
        //   groupText: "Action",
        //   isGroup: true,
        //   matchToActive: ["table", "report"],
        //   listChild: [
        //    {
        //     itemText: "Report",
        //     matchToActive: ["report"],
        //     action: () => {
        //      this.$router.push("/report");
        //     },
        //    },
        //    {
        //     itemText: "Table",
        //     matchToActive: ["table"],
        //     action: () => {
        //      this.$router.push("/table");
        //     },
        //    },
        //   ],
        //  },
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

<style lang="scss" scopped>
@import "@/assets/style/_variables.scss";
.sidebar-container {
  height: 100vh;
  .v-navigation-drawer__content {
    overflow: hidden;
  }
  .body-sidebar-dense {
   height: calc(100% - 40px);
   overflow-y: scroll;
   &-mini {
    padding-left: 6px !important;
   }
   &::-webkit-scrollbar {
    width: 5px;
    height: 6px;
   }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: none;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0);
    }
  }

  .sidebar-card-body {
    box-shadow: none !important;
    .v-navigation-drawer__content {
      background-color: #fff !important;
    }
    .v-navigation-drawer__border {
      display: none !important;
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
    &-on-menu {
     padding-left: 0 !important;
     padding-right: 0 !important;
     width: 100% !important;
     .v-list-item__icon {
      margin: auto !important;
      margin-right: auto !important;
     }
    }

    &:hover {
     background-color: $primaryColorLighterLv2;
     transform: translate(0, -2px);
    }
    .each-items {
      width: calc(100% - 48px);
      margin: auto;
      border-radius: 6px;
      font-family: Roboto;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.3px;
      color: #444444;
      height: 50px;
      margin-bottom: 3px !important;
      .v-list-item__icon {
        margin-right: 19px !important;
      }
      &:hover {
        background-color: $primaryColorLighterLv2;
        transform: translate(0, -2px);
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
      position: relative;
      &::before {
        position: absolute;
        top: 0;
        left: -24px;
        content: "";
        width: 6px;
        height: 100%;
        background-color: $primaryColorLighterLv1;
        border-radius: 0 4px 4px 0;
        z-index: 2;
        opacity: 1;
      }
      &.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
        color: $GPEblueText !important;
      }
    }
    .onechild-on-active {
      background-color: $primaryColorLighterLv1;
      color: $GPEblueText !important;
      &.v-list-group--active {
        background-color: transparent !important;
      }
      .v-list-item--active.v-list-group__header {
        background-color: $primaryColorLighterLv1;
      }
    }
  }
}
.sidebar-logo {
  max-width: 200px;
  display: block;
  margin: auto;
}
.sidebar-logo-link {
  margin-top: 20px;
  display: block;
  width: 100%;
}
</style>
