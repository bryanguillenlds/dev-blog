import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth';
import db from '../firebase/firebaseInit.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      { blogTitle: "Sample Blog #1", blogCoverPhoto: "stock-1", blogDate: "May 30, 2022" },
      { blogTitle: "Sample Blog #2", blogCoverPhoto: "stock-2", blogDate: "May 30, 2022" },
      { blogTitle: "Sample Blog #3", blogCoverPhoto: "stock-3", blogDate: "May 30, 2022" },
      { blogTitle: "Sample Blog #4", blogCoverPhoto: "stock-4", blogDate: "May 30, 2022" }
    ],
    editPost: null,
    user: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null
  },
  mutations: {
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
    }
  },
  actions: {
    async getCurrentUser({commit}) {
      //get the current user doc from firebase, passing the current user id
      const database = await db.collection('users').doc(firebase.auth().currentUser.uid);
      const dbResult = await database.get();

      commit('setProfileInfo', dbResult);
      commit('setProfileInitials');
    }
  },
  modules: {
  }
})
