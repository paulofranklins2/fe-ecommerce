<template>
  <div class="container">
    <!-- Link to Home -->
    <div class="row">
      <div class="col-12 text-center pt-3">
        <router-link :to="{ name: 'Home' }">
<!--          <img id="logo" src="../assets/beth.png" />-->
        </router-link>
      </div>
    </div>

    <!-- Sign up form -->
    <div class="row">
      <div class="col-12 d-flex justify-content-center pt-5">
        <div id="signup-div" class="border p-4">
          <h2 class="pb-3">Create Account</h2>
          <form @submit.prevent="register">
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="email" required />
            </div>

            <div class="form-row">
              <div class="col">
                <div class="form-group">
                  <label>First Name</label>
                  <input type="text" class="form-control" v-model="firstName" required />
                </div>
              </div>

              <div class="col">
                <div class="form-group">
                  <label>Last Name</label>
                  <input type="text" class="form-control" v-model="lastName" required />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model="password" required />
            </div>

            <div class="form-group">
              <label>Confirm Password</label>
              <input type="password" class="form-control" v-model="passwordConfirm" required />
            </div>

            <button type="submit" class="btn btn-primary mt-3">Create Account</button>
          </form>
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
      firstName: null,
      lastName: null,
      password: null,
      passwordConfirm: null
    };
  },
  methods: {
    async register() {
      if (this.password !== this.passwordConfirm) {
        console.error("Passwords do not match");
        return;
      }

      const user = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      };

      try {
        await axios.post(this.baseURL + "auth/register", user, {
          headers: {
            "Content-Type": "application/json"
          }
        });
        this.$router.replace("/");
        console.log("User signup successful. Please Login");
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
