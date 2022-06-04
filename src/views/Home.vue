<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in sampleBlogPost" :key="index" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Articles</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in sampleBlogCards" :key="index"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from '../components/BlogPost.vue';
import BlogCard from '../components/BlogCard.vue';

export default {
  name: "Home",
  components: { BlogPost, BlogCard },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost: [
        {
          title: "Filler Title",
          blogHTML: "Filler Blog Post Title",
          blogCoverPhoto: "beautiful-stories"
        },
        {
          title: "Filler Title",
          blogHTML: "Filler Blog Post Title",
          blogCoverPhoto: "designed-for-everyone"
        }
      ],
      sampleBlogCards: [
        { blogTitle: "Sample Blog #1", blogCoverPhoto: "stock-1", blogDate: "May 30, 2022" },
        { blogTitle: "Sample Blog #2", blogCoverPhoto: "stock-2", blogDate: "May 30, 2022" },
        { blogTitle: "Sample Blog #3", blogCoverPhoto: "stock-3", blogDate: "May 30, 2022" },
        { blogTitle: "Sample Blog #4", blogCoverPhoto: "stock-4", blogDate: "May 30, 2022" }
      ]
    };
  },
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
</style>
