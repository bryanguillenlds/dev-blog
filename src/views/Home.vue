<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in blogPostFeed" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Articles</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostCards" :key="index"/>
        </div>
      </div>
    </div>
    <div v-if="!user" class="updates">
      <div class="container">
        <h2>Never Miss a Post. Sign Up for a <span>Free Account</span> today!</h2>
        <router-link class="router-button" to="#">
          Sign Up to my BlogFolio <Arrow class="arrow arrow-light"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue';
import BlogCard from '../components/BlogCard.vue';
import Arrow from '../assets/Icons/arrow-right-light.svg';

export default {
  name: "Home",
  components: { BlogPost, BlogCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
    };
  },
  computed: {
    blogPostCards() {
      return this.$store.getters.blogPostsCards;
    },
    blogPostFeed() {
      return this.$store.getters.blogPostFeed;
    },
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 850px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 850px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      span {
        color: #1eb863;
      }

      @media (min-width: 850px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
