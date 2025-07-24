<template>
  <div id="app">
    <HeaderHome/>
    <main class="main-content">
      <router-view
          :baseURL="baseURL" :products="products" :categories="categories" @fetchData="fetchData"
      ></router-view>
    </main>
  </div>
</template>

<script>
import HeaderHome from "@/components/HeaderHome.vue";
import axios from 'axios';

export default {
  data() {
    return {
      baseURL: "http://localhost:8080/",
      products: null,
      categories: null
    }
  },
  components: {HeaderHome},

  methods: {
    async fetchData() {
      var token = localStorage.getItem("token");
      if (!token) {
        if (this.$route.path !== "/login") {
          this.$router.push("/login");
          return;
        }
        return;
      }

      function isTokenExpired(token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (!payload.exp) return true;
          return (payload.exp * 1000) < Date.now();
        } catch (e) {
          return true;
        }
      }

      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        if (this.$route.path !== "/login") {
          this.$router.push("/login");
        }
        return;
      }

      await axios.get(this.baseURL + "product/")
          .then(res => this.products = res.data)
          .catch(err => console.log(err))

      await axios.get(this.baseURL + "category/")
          .then(res => this.products = res.data)
          .catch(err => console.log(err));
    }
  }
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
