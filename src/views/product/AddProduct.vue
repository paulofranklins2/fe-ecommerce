<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Add new Product</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form>
          <div class="form-group">
            <label>Category</label>
            <select class="form-control" v-model="categoryId" required>
              <option v-for="category of categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" v-model="name" required/>
          </div>

          <div class="form-group">
            <label>Description</label>
            <input type="text" class="form-control" v-model="description" required/>
          </div>

          <div class="form-group">
            <label>imageURL</label>
            <input type="url" class="form-control" v-model="imageUrl" required/>
          </div>

          <div class="form-group">
            <label>Price</label>
            <input type="number" class="form-control" v-model="price" required/>
          </div>
          <button type="submit" class="btn btn-primary" @click="addProduct">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categoryId: null,
      name: null,
      description: null,
      imageUrl: null,
      price: null
    };
  },
  props: ["baseURL", "categories"],
  methods: {
    async addProduct() {
      const newProduct = {
        categoryId: this.categoryId,
        name: this.name,
        description: this.description,
        imageUrl: this.imageUrl,
        price: this.price
      };

      await axios({
        method: 'post',
        url: this.baseURL + "product",
        data: JSON.stringify(newProduct),
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(() => {
            console.log("Product Added Successfully!");
          });
    }
  }
};
</script>
