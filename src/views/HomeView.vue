<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-md-9">
        <div class="row">
          <div v-for="product in filteredProducts" :key="product.id"
               class="col-md-6 col-xl-4 col-12 pt-3 d-flex justify-content-around">
            <div class="card" style="width: 18rem;">
              <img :src="product.imageURL" class="card-img-top" :alt="product.name">
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <ul class="list-group list-group-flush mb-3">
                  <li class="list-group-item">Price: {{ product.price }}</li>
                </ul>
                <div class="mb-2">
                  <label class="me-2 mb-0">Qty:</label>
                  <input type="number" min="1" v-model.number="quantities[product.id]"
                         class="form-control form-control-sm w-auto d-inline-block"
                         style="width: 70px;"/>
                </div>
                <button class="btn btn-primary w-100"
                        @click="addToCart(product, quantities[product.id] || 1)">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div v-if="filteredProducts.length === 0" class="col-12 text-center pt-5">
            <p>No products found for this category.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// function parseJwt(token) {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//         atob(base64)
//             .split('')
//             .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//             .join('')
//     );
//     return JSON.parse(jsonPayload);
//   } catch (e) {
//     return null;
//   }
// }

export default {
  methods: {
    filterByCategory(categoryId) {
      this.selectedCategory = categoryId;
    },

    addToCart(product, quantity) {
      if (quantity < 1) {
        return;
      }

      var cartItem = {
        productId: product.id,
        quantity: quantity,
      };

      axios({
        method: 'post',
        url: this.baseURL + "/cart/",
        data: JSON.stringify(cartItem),
        headers: {
          'Content-Type': 'application/json'
        }
      })
          .then(() => {
            console.log("Cart Item Added Successfully")
          })
          .catch(err => console.log(err));
    }
  },

  // mounted() {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     const payload = parseJwt(token);
  //     if (payload && payload.sub) {
  //       this.userId = payload.sub;
  //     }
  //   }
  // }
}
</script>