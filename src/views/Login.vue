<template>
  <v-app>
    <v-container fluid fill-height align-center justify-center>
      <v-flex xs12 sm8 md4 class="bg">
        <v-card max-width="600">
          <v-tabs v-model="tab" centered icons-and-text >
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-for="(i, index) in tabs" :key="index">
              <v-icon large>{{ i.icon }}</v-icon>
              <div class="caption py-1">{{ i.name }}</div>
            </v-tab>
            <v-tab-item>
              <v-card-text>
                <v-form ref="form" v-model="valid" class=" pa-3">
                  <v-text-field
                    label="Пароль"
                    name="Пароль"
                    append-icon="mdi-lock"
                    type="text"
                    v-model="password"
                    hide-details
                    outlined
                    class="mb-3"
                    :rules="passwordRules"
                  ></v-text-field>

                  <v-text-field
                    label="email"
                    name="email"
                    append-icon="mdi-at"
                    type="email"
                    v-model="email"
                    hide-details
                    outlined
                    :rules="emailRules"
                    required
                  ></v-text-field>
                </v-form>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :disabled="!valid" @click="Login()">Войти</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-tab-item>
            <v-tab-item>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Фамилия"
                    name="Фамилия"
                    append-icon="mdi-account"
                    type="text"
                    v-model="name"
                    hide-details
                    outlined
                    class="mb-3"
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    label="Пароль"
                    name="Пароль"
                    append-icon="mdi-lock"
                    type="text"
                    v-model="password"
                    hide-details
                    outlined
                    class="mb-3"
                    :rules="passwordRules"
                  ></v-text-field>

                  <v-text-field
                    label="email"
                    name="email"
                    append-icon="mdi-at"
                    type="email"
                    v-model="email"
                    hide-details
                    outlined
                    :rules="emailRules"
                  ></v-text-field>
                </v-form>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :disabled="!valid" @click="Register()"
                    >Регистрация</v-btn
                  >
                </v-card-actions>
              </v-card-text>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    valid: false,
    password: "",
    open: false,
    passwordRules: [(v) => !!v, (v) => v && v.length >= 6],
    name: "",
    nameRules: [(v) => !!v, (v) => v && v.length >= 1],
    email: "",
    emailRules: [(v) => !!v, (v) => /.+@.+\..+/.test(v)],
    drawer: null,
    endMinutes: 0,
    tab: 0,
    tabs: [
      { name: "Войти", icon: "mdi-account" },
      { name: "Регистрация", icon: "mdi-account-outline" },
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },

    async Login() {
      const formData = {
        email: this.email,
        password: this.password,
      };
      try {
        await this.$store.dispatch("Login", formData);
        this.$router.push('/')
       this.$store.dispatch('setError',{code:"login"}) 
      } catch (e) {
         this.$store.dispatch('setError',e)
      }
    },
    async Register() {
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      try {
        await this.$store.dispatch("Register", formData);
        this.$store.dispatch('setError',{code:"register"})
        this.$router.push('/')
        
      } catch (e) {
         this.$store.dispatch('setError',e)
      }
    },
   
  },
   
 
};
</script>
