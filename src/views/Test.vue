<template>
  <v-app>
    <v-app-bar app flat height="75">
      <Timer @finish="finish = !finish" />
      <v-spacer />
      <v-progress-linear v-model="knowledge" height="25" striped class="ml-3">
        <strong>{{ Math.ceil(knowledge) }}%</strong>
      </v-progress-linear>
    </v-app-bar>

    <v-main class="pb-5 align-center justify-center d-flex">
      <v-container>
        <v-snackbar
          v-if="!renderQuestions.length"
          absolute
          centered
          color="primary"
          elevation="24"
        >
          Вопросов пока нет
        </v-snackbar>

        <v-row v-else>
          <v-col
            cols="12"
            v-for="(q, index) in renderQuestions"
            :key="index"
            v-show="index === questionIndex"
          >
            <v-card max-width:600>
              <v-toolbar>
                <v-toolbar-title class="pa-3 primary--text"
                  >#{{ q.index + 1 }}</v-toolbar-title
                >
              </v-toolbar>
              <v-card-title>
                {{ q.question }}
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col
                    v-for="(a, index) in q.answers"
                    :key="index"
                    lg="6"
                    cols="12"
                  >
                    <p>
                      <v-checkbox
                        v-model="a.uAnswer"
                        hide-details
                        class="shrink mr-2 mt-0"
                      ></v-checkbox>
                      {{ a.text }}
                    </p>

                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer fixed class="d-flex justify-space-between" height="70">
      <v-btn class="ma-2" @click="prev" v-if="questionIndex > 0" absolute>
        <v-icon left>
          mdi-arrow-left-bold-box
        </v-icon>
        Назад
      </v-btn>
      <v-btn
        @click="next"
        class="ma-2"
        absolute
        right
        v-if="questionIndex + 2 <= renderQuestions.length"
      >
        Вперед
        <v-icon right>
          mdi-arrow-right-bold-box
        </v-icon>
      </v-btn>
      <v-btn @click="result" class="ma-2" absolute right v-else>
        Завершить
      </v-btn>
    </v-footer>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Timer from "../components/Timer.vue";
export default {
  name: "Test",
  data: () => ({
    loading: false,
    questionIndex: 0,
    count: 0,
    knowledge: 0,
    corect: false,
    finish: false,
  }),
  computed: {
    ...mapGetters(["renderQuestions"]),
  },

  async mounted() {
    await this.fetchQuestions();
  },
  methods: {
    ...mapActions(["fetchQuestions"]),
    next: function() {
      if (this.questionIndex + 1 < this.renderQuestions.length) {
        this.questionIndex++;
        this.knowledge =
          (this.questionIndex / this.renderQuestions.length) * 100;
      }
    },
    prev: function() {
      if (this.questionIndex > 0) this.questionIndex--;
      this.knowledge = (this.questionIndex / this.renderQuestions.length) * 100;
    },
    result() {
      this.renderQuestions.map((item) => {
        if (item.answers.every((element) => element.corect === element.uAnswer))
          this.count++;
        item.corect = true;
      });

      this.$store.dispatch("finishTest", {
        questionsCount: this.renderQuestions.length,
        count: this.count,
        questions: this.renderQuestions,
        date: new Date().toLocaleDateString(),
      });
      this.$router.push("result");
    },
  },
  watch: {
    finish() {
      this.result();
    },
  },
  components: {
    Timer,
  },
};
</script>
