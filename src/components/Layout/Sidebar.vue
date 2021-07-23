<template>
  <v-card class="sidebar-card-body bg-white">
    <!-- <v-btn color="accent" x-small elevation="2" class="btn-toggle-mini" :class="mini ? 'goto-collapse' : 'goto-expand'" @click="toggleMini">
   <v-icon>mdi-chevron-left</v-icon>
  </v-btn> -->
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
            v-if="side.type !== 'divider' && side.isBlock"
            class="pointer each-items single-group single-group-block"
          >
            <v-list-item-title>{{ side.groupText }}</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="side.type !== 'divider' && !side.isGroup && !side.isBlock"
            class="pointer each-items single-group"
            :class="[
              side.matchToActive.includes(currentRouteName)
                ? 'sidechick-on-active'
                : '',
              mini ? 'each-items-on-menu' : '',
            ]"
            @click="side.action()"
          >
            <v-list-item-icon v-if="!side.isBlock">
              <v-icon v-if="!mini && !side.icon">mdi-home</v-icon>
              <img
                v-if="!mini && side.icon"
                :src="side.icon.active"
                alt=""
                class="icon-sidebar-active"
              />
              <img
                v-if="!mini && side.icon"
                :src="side.icon.unActive"
                alt=""
                class="icon-sidebar-unactive"
              />
              <v-tooltip v-if="mini" right>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-if="!side.icon" v-bind="attrs" v-on="on"
                    >mdi-home</v-icon
                  >
                  <img
                    v-if="side.icon"
                    :src="side.icon.active"
                    alt=""
                    v-bind="attrs"
                    v-on="on"
                    class="icon-sidebar-active"
                  />
                  <img
                    v-if="side.icon"
                    :src="side.icon.unActive"
                    alt=""
                    v-bind="attrs"
                    v-on="on"
                    class="icon-sidebar-unactive"
                  />
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
    <ConfirmSignout v-if="logoutIsOpen"></ConfirmSignout>
  </v-card>
</template>

<script lang="ts">
import { ref, defineComponent } from "@vue/composition-api";
import AgencyUnactive from "../../assets/images/sidebar-icon/agency_u.svg";
import AgencyActive from "../../assets/images/sidebar-icon/agency.svg";
import HomeUnactive from "../../assets/images/sidebar-icon/home_white_u.svg";
import HomeActive from "../../assets/images/sidebar-icon/home.svg";
import OrderUnactive from "../../assets/images/sidebar-icon/order_u.svg";
import OrderActive from "../../assets/images/sidebar-icon/order.svg";
import BagUnactive from "../../assets/images/sidebar-icon/bag_u.svg";
import BagActive from "../../assets/images/sidebar-icon/bag.svg";
import SenderUnactive from "../../assets/images/sidebar-icon/sender_u.svg";
import SenderActive from "../../assets/images/sidebar-icon/sender.svg";
import ConsigneeUnactive from "../../assets/images/sidebar-icon/consignee_u.svg";
import ConsigneeActive from "../../assets/images/sidebar-icon/consignee.svg";
import ManifestUnactive from "../../assets/images/sidebar-icon/manifest_u.svg";
import ManifestActive from "../../assets/images/sidebar-icon/manifest.svg";
import SignoutUnactive from "../../assets/images/sidebar-icon/signout_u.svg";
import SignoutActive from "../../assets/images/sidebar-icon/signout.svg";
import ConfirmSignout from "@/components/popup/ConfirmSignout.vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "SideBar",
  props: {
    sidebarIsCollapse: Boolean,
    toggleColappse: Function,
  },
  components: { ConfirmSignout },
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

    return {
      drawer,
      mini,
      currentRouteName,
      setMini,
      setDrawer,
      setCurrentRouteName,
    };
  },

  data() {
    return {
      signOut: false,
      navField: [
        {
          icon: {
            unActive: HomeUnactive,
            active: HomeActive,
          },
          groupText: "Home",
          isGroup: false,
          matchToActive: ["index"],
          action: () => {
            this.$router.push("/");
          },
        },
        {
          icon: {
            unActive: OrderUnactive,
            active: OrderActive,
          },
          groupText: "Order",
          isGroup: false,
          matchToActive: ["order"],
          action: () => {
            this.$router.push("/order");
          },
        },
        {
          icon: {
            unActive: BagUnactive,
            active: BagActive,
          },
          groupText: "Bag",
          isGroup: false,
          matchToActive: ["bag"],
          action: () => {
            this.$router.push("/bag/list");
          },
        },
        {
          icon: {
            unActive: ManifestUnactive,
            active: ManifestActive,
          },
          groupText: "Manifest",
          isGroup: false,
          matchToActive: ["manifest"],
          action: () => {
            this.$router.push("/manifest");
          },
        },
        //  {
        //   groupText: "User Guide",
        //   isGroup: false,
        //   matchToActive: ["about"],
        //   action: () => {
        //    this.$router.push("/about");
        //   },
        //  },
        {
          type: "divider",
        },
        {
          groupText: "Admin",
          isGroup: false,
          isBlock: true,
          matchToActive: [],
        },

        {
          icon: {
            unActive: SenderUnactive,
            active: SenderActive,
          },
          groupText: "Sender",
          isGroup: false,
          matchToActive: ["sender"],
          action: () => {
            this.$router.push("/sender");
          },
        },
        {
          icon: {
            unActive: ConsigneeUnactive,
            active: ConsigneeActive,
          },
          groupText: "Consignee",
          isGroup: false,
          matchToActive: ["consignee"],
          action: () => {
            this.$router.push("/consignee");
          },
        },
        {
          icon: {
            unActive: AgencyUnactive,
            active: AgencyActive,
          },
          groupText: "Agency",
          isGroup: false,
          matchToActive: ["agency"],
          action: () => {
            this.$router.push("/agency");
          },
        },
        //  {
        //   groupText: "Invoice",
        //   isGroup: false,
        //   matchToActive: ["invoice"],
        //   action: () => {
        //    this.$router.push("/invoice");
        //   },
        //  },
        //  {
        //   groupText: "Reports",
        //   isGroup: false,
        //   matchToActive: ["reports"],
        //   action: () => {
        //    this.$router.push("/reports");
        //   },
        //  },
        {
          type: "divider",
        },
        {
          icon: {
            unActive: SignoutUnactive,
            active: SignoutActive,
          },
          groupText: "Sign Out",
          isGroup: false,
          matchToActive: ["none"],
          action: () => {
            this.$store.commit("CONFIRM_LOGOUT", true);
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
  created() {
    this.setMini(this.isMini);
  },
  computed: {
    ...mapState({
      logoutIsOpen: (state: any): boolean => state.logoutIsOpen,
      isMini: (state: any): boolean => state.isMini,
    }),
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
    isMini(newVal) {
      this.setMini(newVal);
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
      color: $GPEdetailData;
      height: 50px;
      margin-bottom: 3px !important;

      .v-list-item__icon {
        margin-right: 19px !important;
        .icon-sidebar-active {
          display: none;
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
      &-block {
        pointer-events: none;
        font-weight: bold;
        font-size: 12px;
        line-height: 14px;
        text-transform: uppercase;
        color: $sidebarText !important;
      }
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
      .icon-sidebar-active {
        display: block !important;
      }
      .icon-sidebar-unactive {
        display: none;
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
