<template>
  <v-container id="regular-tables" fluid tag="section">
    <div class="text-center ma-5" v-if="load">
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-card class="pa-2" v-else>
      <v-simple-table>
        <thead>
          <tr>
            <th class="primary--text">
              Номер
            </th>
            <th class="primary--text">
              Фамилия
            </th>
            <th class="primary--text">
              Тест
            </th>
            <th class="primary--text">
              ответ/вопрос
            </th>
            <th class="primary--text">
              Результат %
            </th>
            <th class="text-right primary--text">
              Подробнее /Удалить
            </th>
          </tr>
        </thead>

        <tbody v-for="(user, index) in users" :key="index">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td :class="[user.usertest ? 'green--text' : '', 'red--text']">
              {{ user.usertest ? "Пройден" : "Не пройден" }}
            </td>
            <td>
              {{ user.usertest ? user.usertest.count : "0" }} из
              {{ user.usertest ? user.usertest.questionsCount : "0" }}
            </td>
            <td>
              {{
                user.usertest
                  ? Math.ceil((user.usertest.count / user.usertest.questionsCount) * 100) 
                  : "0"
              }}%
            </td>
            <td class="text-right">
              <v-btn
                :disabled="!user.usertest"
                tile
                class="ma-1"
                @click="$router.push('/dashboard/users-detail/' + user.id)"
                small
              >
                <v-icon color="primary">
                  mdi-arrow-top-right
                </v-icon>
              </v-btn>
              <v-btn
                :disabled="!user.usertest"
                small
                class="ma-1"
                @click="removeTest(user.id)"
              >
                <v-icon color="primary">
                  mdi-trash-can-outline
                </v-icon>
              </v-btn>
            </td>
          </tr>
          <v-divider class="mx-4"></v-divider>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "Users",
  data: () => ({
    users: [],
    load: true,
  }),
  async mounted() {
    this.users = await this.$store.dispatch("fetchUsers");
    this.load = false;
  },
  methods: {
    async removeTest(id) {
      await this.$store.dispatch("deletUserTest", id);
      this.users = await this.$store.dispatch("fetchUsers");
    },
  },
};
</script>
