import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import moment from "moment";
moment.locale('pt-br');

Vue.filter('formatDate' , function(value) {
  if (value) {
    return moment(String(value)).format('L');
  }
});

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
