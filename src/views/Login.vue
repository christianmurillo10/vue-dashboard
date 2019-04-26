<template>
  <div class="login-background">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card 
            class="elevation-24 mx-auto"
            color="transparent"
            dark
            max-width="400"
          >
            <v-form @submit.prevent="login">
              <v-card-title primary-title class="justify-center">
                <h4 class="headline font-weight-bold">Login Form</h4>
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="username"
                  prepend-icon="person"
                  name="username"
                  label="Username"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn block round color="secondary" type="submit">Login</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      username: "superadmin",
      password: "@dmin2019"
    };
  },
  methods: {
    login() {
      let obj = {
        username: this.username,
        password: this.password
      };
      this.$store
        .dispatch("userAuthentication/setLogin", obj)
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
  .login-background {
    background-image: url("../assets/login-background.jpg");
    background-size: cover;
    height: 100vh;
  }
</style>