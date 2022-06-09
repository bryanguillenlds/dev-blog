import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      { blogTitle: "Sample Blog #1", blogCoverPhoto: "stock-1", blogDate: "May 30, 2022" },
      { blogTitle: "Sample Blog #2", blogCoverPhoto: "stock-2", blogDate: "May 30, 2022" },
      { blogTitle: "Sample Blog #3", blogCoverPhoto: "stock-3", blogDate: "May 30, 2022" },
      { blogTitle: "Sample Blog #4", blogCoverPhoto: "stock-4", blogDate: "May 30, 2022" }
    ],
    editPost: null
  },
  mutations: {
    toggleEditPost(state, payload) {
      state.editPost = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
