<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit Product</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form @submit.prevent="editProduct">
          <div class="form-group">
            <label>Product Name</label>
            <input type="text" class="form-control" v-model="name" required/>
          </div>

          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="description" required/>
          </div>

          <div class="form-group">
            <label>Image URL</label>
            <input type="url" class="form-control" v-model="imageUrl" required/>
          </div>

          <div class="form-group">
            <label>Price</label>
            <input type="currency" class="form-control" v-model="price" required/>
          </div>
            <div class="form-group">
              <label>Category</label>
              <select class="form-control" v-model="categoryId" required>
                <option v-for="category of categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
            </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditProduct',
  props: ['baseURL', 'products', 'categories'],
  data() {
    return {
      id: null,
      name: null,
      description: null,
      imageUrl: null,
      price: null,
      categoryId: null,
    };
  },
  mounted() {
    this.id = parseInt(this.$route.params.id);
    const product = this.products.find(c => c.id === this.id);
    if (product) {
      this.id = product.id;
      this.name = product.name;
      this.description = product.description;
      this.imageUrl = product.imageUrl;
      this.price = product.price;
      this.categoryId = product.categoryId;
    }
  },
  methods: {
    async editProduct() {
      const updatedProduct = {
        id: this.id,
        name: this.name,
        description: this.description,
        price: this.price,
        imageUrl: this.imageUrl,
        categoryId: this.categoryId
      };

      try {
        await axios.put(`${this.baseURL}product/${this.id}`, updatedProduct, {
          headers: {'Content-Type': 'application/json'}
        });
        console.log("Product updated successfully!");
        this.$emit('fetchData');
        this.$router.push({name: 'ListProduct'}); // optional redirect
      } catch (err) {
        console.error("Update failed:", err);
      }
    }
  }
};
</script>
