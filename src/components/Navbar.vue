<template>
  <v-app-bar id="app-bar" app height="75" class="ma-2 ">
    <v-btn class="mr-3 " fab small @click.prevent="$emit('open')">
      <v-icon color="primary">
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-spacer />
    <v-slider
      v-model="minutes"
      class="align-center"
      :max="59"
      :min="1"
      hide-details
      cols="12"
      md="4"
    >
      <template v-slot:append>
        <v-text-field
          v-model="minutes"
          class="mt-0 pt-0"
          hide-details
          single-line
          :max="59"
          :min="1"
          type="number"
        ></v-text-field>
      </template>
    </v-slider>
    <div class="mx-3" />
    <v-btn small @click="setMinutes()">
      <v-icon color="primary">mdi-alarm-multiple</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",

  data: () => ({
    minutes: 0,
    animation: false,
  }),
  methods: {
    async setMinutes() {
      if (this.minutes > 59) {
        return;
      } else {
        const timerMinutes = this.minutes;
        await this.$store.dispatch("setMinutes", timerMinutes);
      }
    },
  },
  async mounted() {
    const min = await this.$store.dispatch("fetchMinutes");
    this.minutes = min.timerMinutes;
  },
};
</script>
