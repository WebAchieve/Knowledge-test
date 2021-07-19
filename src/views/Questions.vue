<template>
  <div class="text-center ma-5" v-if="load">
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
  <v-container v-else>
    <v-alert
      v-if="!renderQuestions.length"
      dense
      type="info"
      width="250"
      fixed
      right
      class="ma-auto mt-3"
    >
      Вопросов пока нет!
    </v-alert>
    <v-card
      v-else
      v-for="q in renderQuestions"
      :key="q.id"
      class="mx-auto ma-3"
    >
      <v-toolbar height="50">
        <v-toolbar-title class="primary--text"
          >#{{ q.index + 1 }}</v-toolbar-title
        >
        <v-spacer />
        <v-btn fab small @click="updateQuestions(q.id)" class="mr-3">
          <v-icon color="primary">
            mdi-pencil-outline
          </v-icon>
        </v-btn>
        <v-btn fab small @click="removeQuestions(q.id)">
          <v-icon color="primary">
            mdi-trash-can-outline
          </v-icon>
        </v-btn>
      </v-toolbar>

      <v-list subheader three-line>
        <v-list-item>
          <v-list-item-content>
            <div class="pb-3">{{ q.question }}</div>
            <v-list-item-subtitle
              class="pa-1 d-flex"
              v-for="(a, index) in q.answers"
              :key="index"
              append-icon="mdi-map-marker"
            >
              {{ index + 1 }}) {{ a.text }}
              <v-spacer />
              <v-icon v-if="a.corect" color="primary"
                >mdi-checkbox-marked-outline</v-icon
              >
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" @click="clear()" fixed right bottom>
          Создать вопрос
        </v-btn>
      </template>
      <v-card class="d-flex flex-column align-center">
        <v-card-title v-if="!id" class="text-h5 primary--text">
          Создать вопрос
        </v-card-title>
        <v-card-title v-else class="text-h5 primary--text">
          Редактировать вопрос
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="question"
            label="Введите вопрос"
            hide-details
            outlined
            class="mb-3 "
          ></v-text-field>
          <div
            v-for="(answer, index) in answers"
            :key="index"
            class="d-flex justify-center  full-width"
          >
            <v-text-field
              v-model="answer.text"
              :label="`Ответ ${index + 1}`"
              hide-details
              outlined
              full-width
              class="mb-3 full-width"
            ></v-text-field>
            <div>
              <v-checkbox v-model="answer.corect"></v-checkbox>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-if="!this.id" @click="addQuestion()">
            Создать
          </v-btn>
          <v-btn v-else @click="fixQuestions()">
            Редактировать
          </v-btn>
          <v-btn @click="dialog = false">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Questions",
  data: () => ({
    question: "",
    dialog: false,
    marker: true,
    id: "",
    answers: [
      { text: "", corect: false, uAnswer: false },
      { text: "", corect: false, uAnswer: false },
      { text: "", corect: false, uAnswer: false },
      { text: "", corect: false, uAnswer: false },
    ],
    load: true,
  }),
  async mounted() {
    await this.fetchQuestions();
    this.load = false;
  },
  methods: {
    ...mapActions(["fetchQuestions"], ["createQuestions"]),
    ...mapMutations(["removeQuestion"]),
    removeQuestions(id) {
      this.removeQuestion({ id });
      this.fetchQuestions();
    },
    async addQuestion() {
      const questions = await this.$store.dispatch("createQuestions", {
        question: this.question,
        answers: this.answers,
        corect: false,
      });
      this.fetchQuestions();

      this.dialog = false;
      return questions;
    },
    async updateQuestions(idx) {
      this.dialog = true;
      this.id = idx;
      this.renderQuestions.filter((item) => {
        if (item.id == idx) {
          this.question = item.question;
          this.answers = item.answers;
        }
      });
    },
    async fixQuestions() {
      await this.$store.dispatch("updateQuestions", {
        question: this.question,
        answers: this.answers,
        corect: this.corect,
        id: this.id,
      });
      this.fetchQuestions();
      this.dialog = false;
    },
    clear() {
      this.question = "";
      (this.answers = [
        { text: "", corect: false, uAnswer: false },
        { text: "", corect: false, uAnswer: false },
        { text: "", corect: false, uAnswer: false },
        { text: "", corect: false, uAnswer: false },
      ]),
        (this.id = "");
    },
  },
  computed: mapGetters(["renderQuestions"]),
};
</script>
