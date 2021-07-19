<template>
  <v-container>
    <v-card v-for="(user, index) in users" :key="index" class="mx-auto ma-3">
      <v-toolbar height="50">
        <v-toolbar-title class="primary--text"
          >#{{ index + 1 }}</v-toolbar-title
        >
      </v-toolbar>

      <v-list subheader three-line>
        <v-list-item>
          <v-list-item-content>
            <div class="pb-3">{{ user.question }}</div>
            <v-list-item-subtitle
              class="pa-1 d-flex "
              :class="{ 'primary--text': unswer.uAnswer }"
              v-for="(unswer, index) in user.answers"
              :key="index"
            >
              {{ index + 1 }}) {{ unswer.text }}
              <v-spacer />
              <v-icon v-if="unswer.corect" color="primary"
                >mdi-checkbox-marked-outline</v-icon
              >
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "UserDetail",
  data: () => ({
    users: [],
  }),
  async mounted() {
    const id = this.$route.params.id;
    this.users = await this.$store.dispatch("fetchUsersById", id);
  },
};
</script>
