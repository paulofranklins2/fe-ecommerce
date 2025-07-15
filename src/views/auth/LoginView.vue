<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center pt-3">
        <router-link :to="{ name: 'Home' }">
          <!-- <img id="logo" src="../assets/beth.png" /> -->
        </router-link>
      </div>
    </div>

    <div class="row">
      <div class="col-12 d-flex justify-content-center pt-5">
        <div id="signin-div" class="border p-4">
          <h2 class="text-center">Sign-In</h2>

          <form @submit.prevent="signin">
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="email" required/>
            </div>

            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model="password" required/>
            </div>

            <small class="form-text text-muted">
              By continuing, you agree to Conditions of Use and Privacy Notice.
            </small>

            <button type="submit" class="btn btn-primary w-100 mt-3">
              Continue
              <div v-if="loading" class="spinner-border spinner-border-sm ml-2" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </form>

          <hr/>

          <p class="text-center">
            <router-link :to="{ name: 'RegisterView' }" class="btn btn-dark w-100">
              Create Account
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      baseURL: "http://localhost:8080/",
      email: null,
      password: null,
      loading: false
    };
  },
  methods: {
    async signin() {
      this.loading = true;

      const user = {
        email: this.email,
        password: this.password
      };

      try {
        const res = await axios.post(this.baseURL + "auth/login", user, {
          headers: {"Content-Type": "application/json"}
        });
        localStorage.setItem("token", res.data.token);
        this.$router.replace("/");
        console.log("Login successful. Please continue");
      } catch (err) {
        console.log("Unable to log you in!");
        console.error(err);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
