<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-light-warning elevation-4">
    <!-- Brand Logo -->
    <router-link to="/" class="brand-link">
        <img src="@/assets/adminlte300-template/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
            style="opacity: .8">
      <span class="brand-text font-weight-light">Tweeter</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item has-treeview menu-open">
            <router-link to="/login" :class="mypath.startsWith('/login')?'nav-link active':'nav-link'">
              <i class="nav-icon fas fa-sign-in-alt"></i>
              <p>Login</p>
            </router-link>
          </li>

          <li class="nav-item has-treeview menu-open">
            <router-link to="/register" :class="mypath.startsWith('/register')?'nav-link active':'nav-link'">
              <i class="nav-icon fas fa-user-plus"></i>
              <p>Register</p>
            </router-link>
          </li>

          <li class="nav-item has-treeview menu-open">
            <router-link to="/feeds" :class="mypath.startsWith('/feeds')?'nav-link active':'nav-link'">
              <i class="nav-icon fas fa-newspaper"></i>
              <p>Feeds</p>
            </router-link>
          </li>

          <li class="nav-item has-treeview menu-open">
            <router-link :to="'/profile/'+user.username" :class="mypath.startsWith('/profile')?'nav-link active':'nav-link'">
              <i class="nav-icon fas fa-user-circle"></i>
              <p>Profile</p>
            </router-link>
          </li>

          <li class="nav-item has-treeview menu-open">
            <router-link to="/users" :class="mypath.startsWith('/users')?'nav-link active':'nav-link'">
              <i class="nav-icon fas fa-users"></i>
              <p>Users</p>
            </router-link>
          </li>

        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
export default {
  name:"MainSidebar",
  computed:{
    user(){
      return this.$store.getters.get_user
    }
  },
  props:["mypath"]
}
</script>

<style>

</style>