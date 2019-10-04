<template>
  <div class="wrapper" id="app">
    <Navbar/>
    <MainSidebar/>
    <ContentWrapper/>
    <ControlSidebar/>
    <Footer/>
  </div>
</template>

<script>
// import '@/assets/dist/js/demo.js';
import Navbar from './components/common/Navbar';
import MainSidebar from './components/common/MainSidebar';
import ContentWrapper from './components/common/ContentWrapper';
// import Post from './components/Post.vue';
import ControlSidebar from './components/common/ControlSidebar';
import Footer from './components/common/Footer';

export default {
  name: 'app',
  components: {
    Navbar,
    MainSidebar,
    ContentWrapper,
    // Post,
    ControlSidebar,
    Footer,
  }
}
</script>
