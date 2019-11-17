<template>
  <!-- Main Sidebar Container -->
  <aside class="main-sidebar sidebar-light-warning elevation-4">
    <!-- Brand Logo -->
    <router-link to="/" class="brand-link">
      <img src="@/assets/adminlte300-template/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </router-link>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="@/assets/adminlte300-template/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">Alexander Pierce</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item has-treeview menu-open">
            <router-link to="/login" class="nav-link active">
              <i class="nav-icon fas fa-sign-in-alt"></i>
              <p>Login</p>
            </router-link>
          </li>

          <li class="nav-item has-treeview menu-open">
            <router-link to="/register" class="nav-link">
              <i class="nav-icon fas fa-user-plus"></i>
              <p>Register</p>
            </router-link>
          </li>
 
          <li class="nav-item has-treeview menu-open">
            <router-link to="/profile" class="nav-link">
              <i class="nav-icon fas fa-user-circle"></i>
              <p>Profile</p>
            </router-link>
          </li>

          <li class="nav-item has-treeview menu-open">
            <router-link to="/users" class="nav-link">
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
	name:"MainSidebar"
}
</script>

<style>

</style>