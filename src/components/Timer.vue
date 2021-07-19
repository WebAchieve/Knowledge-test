<template>
  <div class="d-flex">
    <v-card :color="color" class="font-weight-bold pa-2 ma-1">{{
      minutes
    }}</v-card>
    <v-card :color="color" class="font-weight-bold pa-2 ma-1">{{
      seconds
    }}</v-card>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    totalMinutes: 0,
    endMinutes: 0,
    minutes: "00",
    seconds: "00",
    color: "",
  }),
  async mounted() {
    const total = await this.$store.dispatch("fetchMinutes");
    this.totalMinutes = total.timerMinutes * 60;
    this.endMinutes = total.endTimerMinutes;
    this.setTimer(this.totalMinutes);
  },
  methods: {
    ...mapActions(["fetchMinutes"]),
    setTimer(seconds) {
      clearInterval(this.intervalTimer);
      this.timer(seconds);
    },
    timer(seconds) {
      const end = this.endMinutes;
      this.displayTimeLeft(seconds);
      this.selectedTime = seconds;
      this.countdown(end);
    },
    countdown(end) {
      let intervalTimer = setInterval(() => {
        const secondsLeft = Math.round((end - Date.now()) / 1000);
        if (secondsLeft === 0) {
          this.$emit("finish");
        }
        if (secondsLeft < 60) {
          this.color = "red";
        }

        if (secondsLeft < 0) {
          clearInterval(intervalTimer);
          return;
        }
        this.displayTimeLeft(secondsLeft);
      }, 1000);
    },
    displayTimeLeft(secondsLeft) {
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      this.minutes = this.zeroPadded(minutes);
      this.seconds = this.zeroPadded(seconds);
    },
    zeroPadded(num) {
      // 4 --> 04
      return num < 10 ? `0${num}` : num;
    },
  },
  computed: {
    ...mapGetters(["storeTimer"]),
  },
};
</script>
