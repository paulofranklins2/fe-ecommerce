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
        <div class="border p-4" id="signin-div">
          <h2 class="text-center">Sign-In</h2>

          <form @submit.prevent="signin">
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model="email" required />
            </div>

            <div class="form-group">
              <label>Password</label>
              <input type="password" class="form-control" v-model="password" required />
            </div>

            <button type="submit" class="btn btn-primary w-100 mt-3">
              Continue
              <div v-if="loading" class="spinner-border spinner-border-sm ml-2" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </button>
          </form>

          <hr />

          <button @click="handleGoogleClick" class="btn btn-danger w-100 mt-2">
            Sign in with Google
          </button>

          <p class="text-center mt-3">
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
      baseURL: "/",
      email: null,
      password: null,
      loading: false,
    };
  },
  computed: {
    googleAuthUrl() {
      const params = new URLSearchParams({
        client_id: "701474785746-3r0e67th2cd6s2nb7n729o1gitgta3cr.apps.googleusercontent.com",
        redirect_uri: `${window.location.origin}/oauth/callback`,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        prompt: "consent",
      });
      return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    },
  },
  methods: {
    async signin() {
      this.loading = true;
      const user = {
        email: this.email,
        password: this.password,
      };
      try {
        const res = await axios.post(this.baseURL + "auth/login", user, {
          headers: { "Content-Type": "application/json" },
        });
        localStorage.setItem("token", res.data.token);
        this.$router.replace("/");
        console.log("Login successful. Please continue");
      } catch (err) {
        console.error("Unable to log you in:", err);
      } finally {
        this.loading = false;
      }
    },

    handleGoogleClick() {
      const width = 500;
      const height = 600;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      const popup = window.open(
          this.googleAuthUrl,
          "GoogleOAuth",
          `width=${width},height=${height},top=${top},left=${left},noopener`
      );

      const popupCheckInterval = setInterval(async () => {
        try {
          if (!popup || popup.closed) {
            clearInterval(popupCheckInterval);
            return;
          }
          const popupUrl = popup.location.href;
          if (popupUrl.includes("?code=")) {
            const url = new URL(popupUrl);
            const code = url.searchParams.get("code");
            popup.close();
            clearInterval(popupCheckInterval);

            const res = await axios.post(this.baseURL + "auth/oauth2/callback/google", {
              code: code,
            }, {
              headers: { "Content-Type": "application/json" },
            });

            const token = res.data.token;
            console.log("Token from backend:", token);
            localStorage.setItem("token", token);
            this.$router.replace("/");
          }
        } catch (e) {
          // Ignore cross-origin errors until popup redirects to your own app
        }
      }, 500);
    },
  },
};
</script>
