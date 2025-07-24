<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">Shopping cart</h3>
      </div>
    </div>

    <div v-if="cartItems.length === 0" class="row mt-4">
      <div class="col-12 text-center">
        <p>Your cart is empty.</p>
      </div>
    </div>

    <div
        v-for="cartItem in cartItems"
        :key="cartItem.id"
        class="row mt-3 pt-3 justify-content-around"
    >
      <div class="col-2"></div>
      <div class="col-md-3 embed-responsive embed-responsive-16by9">
        <img
            :src="cartItem.product.imageUrl"
            class="w-100 card-img-top embed-responsive-item"
        />
      </div>
      <div class="col-md-5 px-3">
        <div class="card-block px-3">
          <h6 class="card-title">{{ cartItem.product.name }}</h6>
          <p id="item-price" class="mb-0 font-weight-bold">
            $ {{ cartItem.product.price }} per unit
          </p>
          <p id="item-quantity" class="mb-0">
            Quantity :
            <input
                size="1"
                class="p-0 h-25 border-bottom border-top-0 border-left-0 border-right-0"
                v-model="cartItem.quantity"
                readonly
            />
          </p>
          <p id="item-total-price" class="mb-0">
            Total :
            <span class="font-weight-bold">
              $ {{ cartItem.product.price * cartItem.quantity }}
            </span>
          </p>
        </div>
      </div>
      <div class="col-2"></div>
      <div class="col-12">
        <hr />
      </div>
    </div>

    <div v-if="cartItems.length > 0" class="total-cost pt-2 text-right">
      <h5>Total : $ {{ totalCost }}</h5>
      <button
          @click="getCheckoutSession"
          :disabled="isDisabled()"
          type="button"
          class="btn btn-primary confirm"
      >
        Checkout and Pay
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CartView",
  props: ["baseURL"],
  data() {
    return {
      cartItems: [],
      token: null,
      totalCost: 0,
    };
  },
  methods: {
    isDisabled() {
      return this.cartItems.length === 0;
    },
    listCartItems() {
      axios
          .get(`${this.baseURL}cart/`)
          .then((response) => {
            if (response.status === 200) {
              const result = response.data;
              this.cartItems = result.cartItems;
              this.totalCost = result.totalCost;
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getCheckoutSession() {
      axios({
        method: "post",
        url: this.baseURL + "order/create-checkout-session",
        headers: {
          "Content-Type": "application/json",
        },
      })
          .then((res) => {
            window.open(res.data.checkoutUrl, "_blank");
          })
          .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.listCartItems();
  },
};
</script>

<style scoped>
h4,
h5 {
  font-family: 'Roboto', sans-serif;
  color: #484848;
  font-weight: 700;
}
</style>
