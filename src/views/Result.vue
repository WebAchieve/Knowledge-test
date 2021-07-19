<template>
  <v-app id="result">
    <v-main>
      <v-btn to="/" fixed right top>
        <v-icon>
          mdi-arrow-left-bold-box
        </v-icon>
      </v-btn>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="d-flex flex-column align-center justify-center pa-3">
              <v-card-title center>ВАШ РЕЗУЛЬТАТ</v-card-title>
              <v-progress-circular
                :rotate="360"
                :size="200"
                :width="25"
                :value="value"
                :color="color"
              >
                <h1>{{Math.ceil(value)  }}%</h1>
              </v-progress-circular>
              <v-card-subtitle color="grey darken-3" class="text-uppercase">
                {{ result.count }} правильных ответа из
                {{ result.questionsCount }}
              </v-card-subtitle>
              <h2>{{ text }}</h2>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Result",
  data: () => ({
    value: 0,
    result: [],
  }),
  beforeDestroy() {
    clearInterval(this.interval);
  },
  computed: {
    text() {
      let colors =
        this.value < 55
          ? "Плохо!"
          : this.value < 80
          ? "Хорошо!"
          : this.value <= 95
          ? "Отлично!"
          : "Супер!";
      return colors;
    },
    color() {
      let colors =
        this.value < 55
          ? "red accent-4"
          : this.value < 80
          ? "yellow accent-4"
          : this.value <= 95
          ? "green accent-4"
          : "light-green";
      return colors;
    },
    ...mapGetters(["userFinisTest"]),
  },
  methods: {
    ...mapActions(["fetchfinishTest"]),
  },

  async mounted() {
    const res = await this.$store.dispatch("fetchfinishTest");
    this.result = res;
    this.interval = setInterval(() => {
      this.value = (this.result.count / this.result.questionsCount) * 100;
    }, 1000);
  },
};
</script>
