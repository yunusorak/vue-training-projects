<template>
  <div class="main mx-auto">
    <div>
      <h3 class="text-center">Login</h3>
      <div class="login-box">
        <div class="form-group">
          <label for="email">Email address:</label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter email"
            id="email"
            v-model="auth.email"
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter password"
            id="pwd"
            v-model="auth.password"
          />
        </div>
        <button @click="login">Giriş yap</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      auth: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", { ...this.auth, returnSecureToken: true });
    },
  },
  created() {
    this.$store.dispatch("initAuth");
  },
};
</script>

<style scoped>
.main {
  width: 500px;
  height: 300px;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 5%;
  padding: 15px;
}

.main h3 {
  font-weight: bold;
}

input[type="email"] {
  font-weight: bold;
}
</style>