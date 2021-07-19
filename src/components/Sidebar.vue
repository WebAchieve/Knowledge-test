<template>
  <v-navigation-drawer
    mobile-breakpoint="960"
    app
    width="260"
    v-model="$attrs.value"
  >
    <v-list dense nav>
      <v-list-item>
        <v-switch @click="darkMode()" label="Тема: "></v-switch>
        <v-icon color="primary" class="ml-3" v-if="theme"
          >mdi-weather-night</v-icon
        >
        <v-icon color="primary" class="ml-3" v-else
          >mdi-white-balance-sunny</v-icon
        >
      </v-list-item>
    </v-list>

    <v-divider class="mb-1" />
    <v-list dense nav>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.href"
        color="primary"
        link
      >
        <v-list-item-icon>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// Utilities
export default {
  name: "Sidebar",
  data: () => ({
    items: [
      {
        title: "Вопросы",
        icon: "mdi-help-circle",
        href: "/dashboard/questions",
      },
      { title: "Пользователи", icon: "mdi-account", href: "/dashboard/users" },
      { title: "Выход", icon: "mdi-exit-run", href: "/" },
    ],
    right: null,
    theme: true,
  }),
  methods: {
    darkMode() {
      this.theme = !this.theme;

      this.$vuetify.theme.dark = this.theme;
    },
  },
};
</script>
