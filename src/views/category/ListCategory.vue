<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h4 class="pt-3">Our Categories</h4>
        <router-link id="add-category" :to="{ name: 'AddCategory' }" v-if="$route.name === 'ListCategory'">
          <button class="btn">Add New Category</button>
        </router-link>
      </div>
    </div>
    <div class="row">
      <div v-for="category in categories" :key="category.id" class="col-md-6 col-xl-4 col-12 pt-3 justify-content-center">
        <div class="card" style="width: 18rem;">
          <img :src="category.imageUrl" class="card-img-top" alt="Category image" />
          <div class="card-body">
            <h5 class="card-title">{{ category.name }}</h5>
            <p class="card-text">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  props: ["baseURL", "categories"]
};
</script>
