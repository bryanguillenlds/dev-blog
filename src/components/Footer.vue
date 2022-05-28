<template>
  <div class="container">
    <div class="left">
      <div class="col-1">
        <router-link class="header" :to="{ name: 'home' }">DevBlogFolio</router-link>
        <ul>
          <li>
            <a href="#">
              <twitter class="svg-icon"/>
            </a>
          </li>
          <li>
            <a href="#">
              <twitch class="svg-icon"/>
            </a>
          </li>
          <li>
            <a href="#">
              <instagram class="svg-icon"/>
            </a>
          </li>
          <li>
            <a href="#">
              <linkedin class="svg-icon"/>
            </a>
          </li>
        </ul>
      </div>
      <div class="col-2">
        <ul>
          <router-link class="link" :to="{ name: 'home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'blogs' }">Blogs</router-link>
          <router-link v-if="user" class="link" :to="{ name: 'newpost' }">Create Post</router-link>
          <router-link v-if="!user" class="link" :to="{ name: 'login' }">Sign In / Sign Up</router-link>
        </ul>
      </div>
      <div class="right">
        <p>Copyright 2022 All Rights Reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
import twitter from '../assets/Icons/twitter-brands.svg';
import instagram from '../assets/Icons/instagram-brands.svg';
import linkedin from '../assets/Icons/linkedin-brands.svg';
import twitch from '../assets/Icons/twitch-icon.svg';

export default {
  name: 'footer-vue',
  components: {
    twitter,
    instagram,
    linkedin,
    twitch
  }
}
</script>

<style lang="scss" scoped>

</style>