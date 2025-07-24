<!--<template>-->
<!--  <nav class="navbar navbar-expand-lg navbar-light bg-light">-->
<!--    <div class="container-fluid">-->
<!--&lt;!&ndash;      <router-link class="navbar-brand" :to="{ name: 'home' }">&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash;        <img src="../assets/beth.png" height="40px" />&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;      </router-link>&ndash;&gt;-->

<!--      <div class="collapse navbar-collapse" id="navbarSupportedContent">-->
<!--        <ul class="navbar-nav me-auto mb-2 mb-lg-0">-->
<!--          <li class="nav-item">-->
<!--            <router-link :to="{ name: 'ListCategory' }">-->
<!--              <a class="nav-link" aria-current="page" href="#">Categories</a>-->
<!--            </router-link>-->
<!--          </li>-->
<!--          <li class="nav-item">-->
<!--            <router-link :to="{ name: 'ListProduct' }">-->
<!--              <a class="nav-link" aria-current="page" href="#">Products</a>-->
<!--            </router-link>-->
<!--          </li>-->
<!--        </ul>-->

<!--        <div>-->
<!--          <router-link :to="{ name: 'AddCategory' }">-->
<!--            <button class="btn btn-outline-success" type="submit">Add Category</button>-->
<!--          </router-link>-->
<!--        </div>-->
<!--        <div>-->
<!--          <router-link :to="{ name: 'AddProduct' }">-->
<!--            <button class="btn btn-outline-success" type="submit">Add Product</button>-->
<!--          </router-link>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </nav>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "HeaderHome",-->
<!--  data() {-->
<!--    return {};-->
<!--  },-->
<!--  methods: {}-->
<!--};-->
<!--</script>-->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">
<!--        <img src="./assets/beth.png" height="40px" />-->
      </router-link>
      <div class="ms-auto d-flex align-items-center">
        <span v-if="userEmail" class="fw-bold">Welcome, {{ userEmail }}</span>
        <button
            class="cart-link"
            style="margin-left: 20px; font-size: 1.2em;"
            @click="goToCart"
        >
          Cart
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default {
  name: "HeaderHome",
  data() {
    return {
      userEmail: null
    };
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = parseJwt(token);
      if (payload && payload.sub) {
        this.userEmail = payload.sub;
      }
    }
  },
  methods: {
    goToCart() {
      this.$router.push('/cart');
    }
  }
};
</script>
