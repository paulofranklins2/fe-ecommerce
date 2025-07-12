<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
<!--      <router-link class="navbar-brand" :to="{ name: 'home' }">-->
<!--        &lt;!&ndash;        <img src="../assets/beth.png" height="40px" />&ndash;&gt;-->
<!--      </router-link>-->

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'ListCategory' }">
              <a class="nav-link" aria-current="page" href="#">Categories</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'ListProduct' }">
              <a class="nav-link" aria-current="page" href="#">Products</a>
            </router-link>
          </li>
        </ul>

        <div>
          <router-link :to="{ name: 'AddCategory' }">
            <button class="btn btn-outline-success" type="submit">Add Category</button>
          </router-link>
        </div>
        <div>
          <router-link :to="{ name: 'AddProduct' }">
            <button class="btn btn-outline-success" type="submit">Add Product</button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "HeaderHome",
  data() {
    return {};
  },
  methods: {}
};
</script>
