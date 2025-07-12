<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h4 class="pt-3">Add New Category</h4>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-6">
        <form @submit.prevent="addCategory">
          <div class="form-group mb-3">
            <label>Category Name</label>
            <input type="text" class="form-control" v-model="name" required />
          </div>

          <div class="form-group mb-3">
            <label>Description</label>
            <input type="text" class="form-control" v-model="description" required />
          </div>

          <div class="form-group mb-4">
            <label>Img URL</label>
            <input type="text" class="form-control" v-model="imgUrl" required />
          </div>

          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddCategory',
  props: ['baseURL'],
  data() {
    return {
      name: '',
      description: '',
      imgUrl: ''
    };
  },
  methods: {
    async addCategory() {
      const newCategory = {
        name: this.name,
        description: this.description,
        imageUrl: this.imgUrl
      };

      try {
        await axios.post(this.baseURL + 'category', newCategory);
        console.log('Category Added Successfully');
        // Optional: emit to parent or redirect
        this.$emit('fetchData'); // refresh categories in parent
        this.$router.push({ name: 'ListCategory' }); // redirect to list
      } catch (err) {
        console.error('Error adding category:', err.response?.data || err.message);
      }
    }
  }
};
</script>
