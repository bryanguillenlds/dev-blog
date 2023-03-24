import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vue2Editor);

Vue.config.productionTip = false;

let app;

//Use firebase to do something when the state of auth has changed
firebase.auth().onAuthStateChanged(() => {
  //if app hasn't been initialized yet, initialize it
  //this is to avoid that the app is initialized BEFORE
  //the authentication is resolved
  if (!app) {
    new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
})

