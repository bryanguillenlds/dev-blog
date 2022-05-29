<template>
  <div class="blog-wrapper">
    <div class="blog-content">
      <div>
        <h2></h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'blogPost',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>