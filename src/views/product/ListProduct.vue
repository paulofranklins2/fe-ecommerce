<template>
  <div class="container">
    <div class="row">
    </div>
    <div class="row">
      <div v-for="product in products" :key="product.id" class="col-md-6 col-xl-4 col-12 pt-3 justify-content-center">
        <div class="card" style="width: 18rem;">
          <img :src="product.imageUrl" class="card-img-top" alt="Product image" />
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text">{{ product.price }}</p>
            <p class="card-text">{{ product.categoryId }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListProduct',
  props: ["baseURL", "products"],
};
</script>
