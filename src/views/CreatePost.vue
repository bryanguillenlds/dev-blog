<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview"/>

    <Loading v-show="loading" />

    <div class="container">
      <div class="err-message" :class="{ invisible: !error}">
        <p><span>Error:</span>{{ this.errorMsg }}</p>
      </div>

      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input @change="fileChange" type="file" ref="blogPhoto" id="blog-photo" accept=".png, .jpg, .jpeg">
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL}">Preview Cover</button>
          <span>File Chosen: {{ this.$store.state.blogPhotoName }}</span>
        </div>
      </div>

      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler"/>
      </div>

      <div class="blog-actions">
        <button @click="uploadBlog">Publish Article</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import BlogCoverPreview from "@/components/BlogCoverPreview.vue";
import firebase from 'firebase/app';
import 'firebase/auth';
import db from '../firebase/firebaseInit.js';
import Loading from "@/components/Loading.vue";

window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  name: 'CreatePost',
  components: {Loading, BlogCoverPreview},

  data() {
    return {
      file: null,
      error: null,
      errorMsg: null,
      editorSettings: {
        modules: {
          imageResize: {}
        }
      },
      laoding: null,
    }
  },

  computed: {
    profileId() {
      return this.$store.state.profileId;
    },

    blogPhotoName() {
      return this.$store.state.blogPhotoName;
    },

    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit('updateBlogTitle', payload);
      }
    },

    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit('newBlogPost', payload);
      }
    }
  },

  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0]; //get file from input

      //commit file name change
      const fileName = this.file.name;
      this.$store.commit('fileNameChange', fileName);

      //commit the file url
      this.$store.commit('createFileURL', URL.createObjectURL(this.file));
    },

    openPreview() {
      this.$store.commit('openPhotoPreview');
    },

    imageHandler(file, Editor, cursorLocation, resetUploader) {
      //refs to firebase store and document
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);

      //store the file and retrieve its URL to use it on editor
      docRef.put(file).on('state_changed',(snapshot) => {
        console.log(snapshot);
      }, (err) => {
        console.log(err);
      }, async () => {
        //get url from db and inser it into quill editor
        const downloadURL = await docRef.getDownloadURL();
        Editor.insertEmbed(cursorLocation, "image", downloadURL);
        resetUploader(); //reset the uploader
      })
    },

    uploadBlog() {
      //validate
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        //if there is a file, store it
        if (this.file) {
          //set loading status
          this.loading = true;

          //get ref to storage and document where you want to store the photo
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(`documents/BlogCoverPhoto/${this.$store.state.blogPhotoName}`);
          //store it
          docRef.put(this.file).on('state_changed', (snapshot) => {
            console.log(snapshot)
          }, (err) => {
            console.log(err);
            this.loading = false;
          }, async () => {
            const downloadURL = await docRef.getDownloadURL(); //get url for post
            const timestamp = await Date.now(); //create a timestamp
            const dataBase = await db.collection('blogPosts').doc(); //ref to db

            //send to db
            await dataBase.set({
              blogId: dataBase.id,
              blogHTML: this.blogHTML,
              blogCoverPhoto: downloadURL,
              blogCoverPhotoName: this.blogPhotoName,
              blogTitle: this.blogTitle,
              profileId: this.profileId,
              date: timestamp
            });

            this.loading = false;
            //redirect to blog view
            this.$router.push({ name: 'ViewBlog' })
          });
          return;
        }

        //error handling
        this.error = true;
        this.errorMsg = 'Please make sure you uploaded a cover photo';

        //clear error status
        setTimeout(() => {
          this.error = false;
        }, 5000);

        return;
      }

      //error handling
      this.error = true;
      this.errorMsg = 'Please ensure blog title and blog post has been filled';

      //clear error status
      setTimeout(() => {
        this.error = false;
      }, 5000);

      return;
    }
  }
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: #1eb863;
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  // error styling
  .invisible {
    opacity: 0 !important;
  }
  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;
    input:nth-child(1) {
      min-width: 300px;
    }
    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;
      input {
        display: none;
      }
      .preview {
        margin-left: 16px;
        text-transform: initial;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .ql-editor {
      padding: 20px 16px 30px;
      max-height: 57vh;
    }
  }
  .blog-actions {
    margin-top: 32px;
    button {
      margin-right: 16px;
    }
  }
}
</style>