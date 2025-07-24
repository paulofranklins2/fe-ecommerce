<script>
import axios from "axios";

export default {
  async mounted() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    if (code) {
      try {
        const res = await axios.post("/auth/oauth2/callback/google", {
          code: code,
        });
        const token = res.data.token;
        localStorage.setItem("token", token);
        console.log("Token from backend:", token);
        this.$router.replace("/");
      } catch (error) {
        console.error("OAuth POST failed", error);
      }
    }
  },
};
</script>

<template>
  <div>Authenticating...</div>
</template>
