<template>
<v-app>
  <router-view />
  <div class="text-center red">
    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
      :color="color"
      absolute
      right
      rounded="pill"
      top
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
         <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</v-app>

</template>

<script>
 import mesages from "./utils/mesages"; 
import {mapGetters } from "vuex";

export default {
  name: 'App',
 
  data: () => ({
    multiLine: false,
      snackbar: false,
      text: '',
       color:"",

  }),
   computed:{
    ...mapGetters(["error"])
  },
  watch: {
    error(er){
    if(mesages[er.code] === undefined){
      this.text =  "Ошибка!!!"
      this.color = "error"
      this.snackbar=true
    }else{
      this.text =  mesages[er.code].text
       this.color = mesages[er.code].color
       this.snackbar=true
    }
      

    }
  }
};
</script>
