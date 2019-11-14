<template>
  <div class="wrapper" id="app">
    <Navbar/>
    <MainSidebar/>
    <!-- <ContentWrapper/> -->
    <router-view/>
    <span v-if="isLoggedIn"> | <button class="btn btn-danger" @click="logout">Logout</button></span>
    <ControlSidebar/>
    <Footer/>
  </div>
</template>

<script>
// import '@/assets/dist/js/demo.js';
import Navbar from './components/shared/Navbar';
import MainSidebar from './components/shared/MainSidebar';
// import ContentWrapper from './components/shared/ContentWrapper';
// import Post from './components/Post.vue';
import ControlSidebar from './components/shared/ControlSidebar';
import Footer from './components/shared/Footer';

export default {
  name: 'app',
  components: {
    Navbar,
    MainSidebar,
    // ContentWrapper,
    // Post,
    ControlSidebar,
    Footer,
  },
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  },
}
</script>
