<template>
  <nav>
    <HeaderHome></HeaderHome>
    <router-view
        v-if="products && categories"
        :baseURL="baseURL"
        :products="products"
        :categories="categories"
        @fetchData="fetchData"
    ></router-view>
  </nav>
</template>

<script>
import axios from 'axios';
import HeaderHome from "@/components/HeaderHome.vue";

export default {
  components: {HeaderHome},
  data() {
    return {
      baseURL: 'http://localhost:8080/',
      products: null,
      categories: null,
    };
  },

  methods: {
    async fetchData() {
      await axios.get(this.baseURL + 'product')
          .then(response => this.products = response.data)
          .catch(error => console.log(error));

      await axios.get(this.baseURL + 'category')
          .then(response => this.categories = response.data)
          .catch(error => console.log(error));
    }
  },

  mounted() {
    this.fetchData();
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
