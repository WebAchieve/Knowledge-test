<template>
  <div>
    <Navbar @open="drawer = !drawer" />
    <Sidebar v-model="drawer" />
    <MainView />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Sidebar from "../components/Sidebar.vue";
import MainView from "../components/MainView.vue";
export default {
  name: "Dashboard",
  data: () => ({
    drawer: true,
  }),
  components: {
    Navbar,
    Sidebar,
    MainView,
  },
};
</script>
