<template>
  <div class="app-wrapper">
    <div class="app" v-if="this.$store.state.postLoaded">
      <Navigation v-if="!isNavDisabled"/>
      <router-view />
      <FooterNav v-if="!isNavDisabled"/>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import FooterNav from "./components/FooterNav.vue";
import firebase from 'firebase/app'
import 'firebase/auth';

export default {
  name: "app",
  components: { Navigation, FooterNav },
  data() {
    return {
      isNavDisabled: null
    };
  },
  created() {
    //Tell the store if there is a user or not when the auth state changes
    //firebase returns either true or false
    firebase.auth().onAuthStateChanged(async (user) => {
      this.$store.commit('updateUser', user);
      //if we do have a user logged in...
      if (user) {
        //get the current user's info
        this.$store.dispatch('getCurrentUser', user);
      }
    });
    this.toggleNavBar(); //toggle nav bar based on route

    this.$store.dispatch('getPost'); //get blog post data
  },
  mounted() {},
  methods: {
    toggleNavBar() {
      if(this.$route.name === 'Login' || this.$route.name === 'Register' || this.$route.name === 'ForgotPassword') {
        this.isNavDisabled = true;
        return;
      }
      this.isNavDisabled = false;
    }
  },
  watch: {
    $route() {
      this.toggleNavBar(); //run it whenever the route changes
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  margin-left: 8px;
  width: 12px;
  path {
    fill: #000;
  }
}
.arrow-light {
  path {
    fill: #fff;
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #1eb863;
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;

  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }
  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;
  @media (min-width: 550px) {
    padding: 100px 16px;
  }
  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    
    @media (min-width: 550px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 950px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1150px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
