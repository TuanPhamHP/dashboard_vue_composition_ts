<template>
  <div>
    <div class="form-login mx-auto">
      <img
        src="../../assets/images/gpe_logo.png"
        width="172px"
        height="115px"
      />
      <div class="header">Sign in</div>
      <div class="notice">Please enter username and password to continue</div>
      <div class="login-field">
        <div class="username">
          <div class="text">Username</div>
          <input
            v-model="username"
            placeholder="nguyenvananh@gmail.com"
            class="input"
            :class="!username && clickedSubmit ? 'error-type' : ''"
          />
          <small v-if="!username && clickedSubmit" class="error-msg"
            >*Please fulfill username</small
          >
        </div>
        <div class="password">
          <div style="display: flex; justify-content: space-between">
            <div class="text">Password</div>
            <div class="text" style="opacity: 0.6; cursor: pointer">
              Forgot password ?
            </div>
          </div>
          <input
            v-model="password"
            type="password"
            class="input-password"
            :class="!password && clickedSubmit ? 'error-type-password' : ''"
          />
          <small v-if="!password && clickedSubmit" class="error-msg"
            >*Please fulfill password</small
          >
        </div>
        <div class="remember-me">
          <input class="checkbox" type="checkbox" id="checkbox" />
          <label
            for="checkbox"
            class="text"
            style="opacity: 0.6; cursor: pointer"
            >Save password</label
          >
        </div>
      </div>
      <div class="sign-in mx-auto" @click="submit">Sign in</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from "@vue/composition-api";
import api from "@/services";
export default defineComponent({
  components: {},
  setup: (props) => {
    let username = ref<string>("");
    let password = ref<string>("");
    let clickedSubmit = ref<boolean>(false);
    const authenticate = async (query: Record<string, string>) => {
      const res = await api.user.loginUser(query);
      if (!res) {
        return;
      }
      try {
        console.log(res);
        //  setPagination({
        //   total: pagination.total,
        //   total_pages: pagination.total_pages,
        //   per_page: pagination.per_page,
        //   current_page: pagination.current_page,
        //  });
      } catch (error) {
        console.log(error);
      }
    };
    return {
      username,
      password,
      clickedSubmit,
      authenticate,
    };
  },
  methods: {
    submit() {
      this.clickedSubmit = true;
      if (!this.username || !this.password) {
        return;
      }
      let body = {
        username: this.username,
        password: this.password,
      };
      this.authenticate({ ...body });
      // const res = await api.user.getUserInfo();
      // if (!res) {
      //   localStorage.removeItem("auth._token.local");
      //   next({
      //     path: "/login",
      //     query: { redirect: to.fullPath },
      //   });
      // }
      // try {
      //   if (res.status > 399) {
      //     localStorage.removeItem("auth._token.local");
      //     next({
      //       path: "/login",
      //       query: { redirect: to.fullPath },
      //     });
      //     return;
      //   }
      //   if (res.response && !res.response.data.success) {
      //     localStorage.removeItem("auth._token.local");
      //     next({
      //       path: "/login",
      //       query: { redirect: to.fullPath },
      //     });
      //     return;
      //   }
      //   const localToken = localStorage.getItem("auth._token.local");
      //   const auth_set = {
      //     isAuth: true,
      //     user: res.data.data,
      //     token: `Bearer ${localToken}`,
      //   };
      //   store.commit("SET_USER_LOGGEDIN", auth_set);
      //   const nextStep =
      //     to.query && to.query.redirect ? to.query.redirect : "/";
      //   next({
      //     path: String(nextStep),
      //   });
      // } catch (error) {
      //   console.log(error);
      //   next({
      //     path: "/login",
      //     query: { redirect: to.fullPath },
      //   });
      // }
    },
  },
});
</script>

<style scoped lang="scss">
::-webkit-input-placeholder {
  /* Edge */
  color: #a6a6a6;
}

:-ms-input-placeholder {
  /* Internet Explorer */
  color: #a6a6a6;
}

::placeholder {
  color: #a6a6a6;
}
.error-msg {
  color: #ff0000;
}
.form-login {
  text-align: center;
  background-color: #ffffff;
  padding: 30px 59px 30px 59px;
  border-radius: 24px;
  min-height: fit-content;
  height: 830px;
  width: 630px;
  .header {
    color: #202224;
    font-size: 32px;
    font-weight: bold;
    margin-top: 27px;
  }
  .notice {
    color: #202224;
    font-size: 18px;
    font-weight: 400;
    margin-top: 18px;
  }
  .login-field {
    margin-top: 40px;
    text-align: left;
    .username {
      margin-bottom: 40px;
    }
    .input {
      border: 1px solid #d8d8d8;
      width: 100%;
      outline: none;
      height: 56px;
      padding: 16px 16px 19px 16px;
      background: #f1f4f9;
      border-radius: 8px;
      font-size: 18px;
      margin-top: 19px;
      color: #a6a6a6;
    }
    .error-type {
      background-color: rgba(249, 60, 101, 0.15);
      border: 1px solid #ff0000;
    }
    .input-password {
      border: 1px solid #d8d8d8;
      width: 100%;
      outline: none;
      height: 56px;
      padding: 21px 16px 21px 16px;
      background: #f1f4f9;
      border-radius: 8px;
      font-size: 35px;
      margin-top: 19px;
      color: #a6a6a6;
      letter-spacing: 16px;
    }
    .error-type-password {
      background-color: rgba(249, 60, 101, 0.15);
      border: 1px solid #ff0000;
    }
    .remember-me {
      display: flex;
      margin-top: 24px;
      align-items: center;
      .checkbox {
        margin-right: 12px;
        height: 24px;
        width: 24px;
        cursor: pointer;
      }
    }
  }
  .sign-in {
    margin-top: 53px;
    background-color: #4880ff;
    padding-top: 15px;
    padding-bottom: 18px;
    width: calc(100% - 24px);
    border-radius: 8px;
    opacity: 0.9;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
