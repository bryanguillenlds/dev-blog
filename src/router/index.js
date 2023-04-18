import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from '../views/Profile.vue';
import Admin from '../views/Admin.vue';
import CreatePost from '../views/CreatePost.vue';
import BlogPreview from '../views/BlogPreview.vue';
import ViewBlog from '../views/ViewBlog.vue';
import EditBlog from "@/views/EditBlog.vue";

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: 'Home',
      requiresAuth: false
    }
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: 'Blogs',
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: 'Login',
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: 'Register',
      requiresAuth: false
    }
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      requiresAuth: false
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: 'Forgot Password',
      requiresAuth: true
    }
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: 'Admin',
      requiresAuth: true,
      requireAdmin: true
    }
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: 'Create Post',
      requiresAuth: true,
      requireAdmin: true
    }
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: 'Blog Post',
      requiresAuth: true,
      requireAdmin: true
    }
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: 'View BlogPost',
      requiresAuth: false
    }
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: 'Edit BlogPost',
      requiresAuth: true,
      requireAdmin: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Accessing each route and setting the document title
// so it matches the route
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | BlogFolio`;
  next();
})

//route guarding for admin specific routes
router.beforeEach(async (to, from, next) => {
  let user = firebase.auth().currentUser; //grab user
  let admin = null;

  //if there is a user, get admin token
  if (user) {
    let token = await user.getIdTokenResult();
    admin = token.claims.admin;
  }

  //if route we are navigating to requires authentication/log-in...
  if (to.matched.some((res) => res.meta.requiresAuth)) {
    //if there is a user authenticated...
    if (user) {
      //if the route requires the auth user to be an admin...
      if (to.matched.some((res) => res.meta.requiresAdmin)) {
        //check if admin and send next route
        if (admin) {
          return next();
        }

        return next({ name: 'Home'}); //if no admin, send home
      }

      return next(); //if no admin required, navigate.
    }

    return next({ name: 'Home'}); //if no auth required, just navigate to home
  }

  return next();
});

export default router;
