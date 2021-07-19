import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@/scss/style.sass'


Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      dark: true,
        themes: {
          dark: {
            primary:'#2196f3',
            background: '#292d32'
          },
          light: {
            primary:'#2196f3',
            background: '#ececec'
          },
         
        }
      }
});
