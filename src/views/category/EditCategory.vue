<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Edit Category</h4>
      </div>
    </div>

    <div class="row">
      <div class="col-3"></div>
      <div class="col-md-6 px-5 px-md-0">
        <form @submit.prevent="editCategory">
          <div class="form-group">
            <label>Category Name</label>
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
  name: 'EditCategory',
  props: ['baseURL', 'categories'],
  data() {
    return {
      id: null,
      name: null,
      description: null,
      imageUrl: null
    };
  },
  mounted() {
    this.id = parseInt(this.$route.params.id);
    const category = this.categories.find(c => c.id === this.id);
    if (category) {
      this.name = category.name;
      this.description = category.description;
      this.imageUrl = category.imageUrl;
    }
  },
  methods: {
    async editCategory() {
      const updatedCategory = {
        id: this.id,
        name: this.name,
        description: this.description,
        imageUrl: this.imageUrl
      };

      try {
        await axios.put(`${this.baseURL}category/${this.id}`, updatedCategory, {
          headers: {'Content-Type': 'application/json'}
        });
        console.log("Category updated successfully!");
        this.$emit('fetchData');
        this.$router.push({name: 'ListCategory'}); // optional redirect
      } catch (err) {
        console.error("Update failed:", err);
      }
    }
  }
};
</script>
