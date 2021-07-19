<template>
  <v-app>
    <v-container fluid fill-height align-center justify-center>
      <v-btn fixed top right @click.prevent="logout()">
        <v-icon color="primary">mdi-exit-run</v-icon>
      </v-btn>
      <v-flex xs12 sm8 md4>
        <v-card max-width="600" class="d-flex flex-column">
          <h2 class="text-center pa-3 primary--text">
            Пройдите тест за {{ timer }} минут
          </h2>
          <v-btn class="ma-5 " @click="startTest()">
            Начать тест
          </v-btn>
          <v-btn class="ma-5 " to="/dashboard/questions">
            Админ панель
          </v-btn>
        </v-card>
      </v-flex>
    </v-container>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Enter",
  data: () => ({
    endMinutes: 0,
    timer: 0,
  }),
  methods: {
    async startTest() {
      this.endMinutes = Date.now() + this.storeTimer.timerMinutes * 60 * 1000;
      await this.$store.dispatch("setEndMinutes", {
        endTimerMinutes: this.endMinutes,
        timerMinutes: this.storeTimer.timerMinutes,
      });
      this.$router.push("/test");
    },
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
      this.$store.dispatch("setError", { code: "logout" });
    },
  },
  computed: {
    ...mapGetters(["storeTimer"]),
  },
  async mounted() {
    await this.$store.dispatch("fetchMinutes");
    if (this.storeTimer === null) {
      this.timer = 5;
      const timerMinutes = this.timer;
      this.$store.dispatch("setMinutes", timerMinutes);
    } else {
      this.timer = this.storeTimer.timerMinutes;
    }
  },
};
</script>
