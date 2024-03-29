import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth';
import db from '../firebase/firebaseInit.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, payload) {
      state.profileId = payload.id;
      state.profileEmail = payload.data().email; //have to use data() from firebase to get this info
      state.profileFirstName = payload.data().firstName;
      state.profileLastName = payload.data().lastName;
      state.profileUsername = payload.data().username;
    },
    setProfileInitials(state) {
      state.profileInitials =
          state.profileFirstName.match(/(\b\S)?/g).join('') +
          state.profileLastName.match(/(\b\S)?/g).join('');
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload);
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    }
  },
  actions: {
    async getCurrentUser({commit}, user) {
      //get the current user doc from firebase, passing the current user id
      const database = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResult = await database.get();

      commit('setProfileInfo', dbResult);
      commit('setProfileInitials');

      //get token to determine if user is admin
      const token = await user.getIdTokenResult(true); //need true param to force token refresh
      const admin = await token.claims.admin;

      commit('setProfileAdmin', admin);
    },

    async getPost({state}) {
      //ref to db
      const database = await db.collection('blogPosts').orderBy('date', 'desc');
      const dbResults = await database.get(); //return arr of results

      dbResults.forEach(doc => {
        //check if blog has already been added to state before,
        //if not...add it
        if (!state.blogPosts.some(post => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName
          };

          //push it to state blog posts
          state.blogPosts.push(data);
        }
      });

      state.postLoaded = true; //set loaded state
    },

    async updatePost({commit, dispatch}, payload) {
      //commit to filter out the post from the list of posts
      commit('filterBlogPost', payload);

      await dispatch('getPost'); //retrieve posts to get the updated one
    },

    async deletePost({commit}, payload) {
      //retrieve post reference from db
      const post = await db.collection('blogPosts').doc(payload);

      await post.delete(); //delete from db

      //commit to filter out the deleted post
      commit('filterBlogPost', payload);
    },

    async updateUserSettings({commit, state}) {
      const database = await db.collection('users').doc(state.profileId);
      await database.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername
      });
      commit('setProfileInitials');
    }
  },
  getters: {
    blogPostFeed(state) {
      return state.blogPosts.slice(0, 2); //retrieve first two posts
    },

    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6); //retrieve 4 more posts
    }
  },
  modules: {
  }
})
