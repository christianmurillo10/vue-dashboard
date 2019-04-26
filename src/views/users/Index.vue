<template>
  <div>
    <v-alert
      v-model="alertDetails.alert"
      :type="alertDetails.type"
      dismissible
      outline
    >
      {{ alertDetails.message }}
    </v-alert>
    <v-divider></v-divider>
    <v-toolbar dense>
      <v-toolbar-title>Users</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>person_add</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey darken-3 white--text">
            <span>{{ formTitle }}</span>
          </v-card-title>

          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                      v-model="editedItem.username" 
                      :rules="validateItem.usernameRules"
                      label="Username" 
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 v-if="this.editedIndex === -1">
                    <v-text-field
                      v-model="editedItem.password" 
                      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="validateItem.passwordRules"
                      label="Password"
                      @click:append="showPassword = !showPassword"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                      v-model="editedItem.email" 
                      :rules="validateItem.emailRules"
                      label="Email"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select
                      :items="positionList"
                      item-value="id"
                      item-text="name"
                      v-model="editedItem.position_id"
                      :rules="validateItem.positionRules"
                      label="Position"
                      required
                    ></v-select>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat :disabled="!valid" @click="save">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="itemList" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.username }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.position_name }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-span class="justify-center layout px-0">No data found!</v-span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    alertDetails: {
      alert: false,
      type: "success",
      message: ""
    },
    headers: [
      { text: "Username", value: "username" },
      { text: "Email", value: "email" },
      { text: "Position", value: "position_id" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ],
    itemList: [],
    editedIndex: -1,
    editedItem: {
      username: "",
      password: "",
      email: "",
      position_id: null
    },
    defaultItem: {
      username: "",
      password: "",
      email: "",
      position_id: null
    },
    valid: true,
    validateItem: {
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 50) || 'Username must be less than 50 characters'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 50) || 'Password must be less than 50 characters'
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid'
      ],
      positionRules: [
        v => !!v || 'Position is required'
      ],
    },
    showPassword: false,
    positionList: []
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.$store
        .dispatch("users/getData", "")
        .then(response => {
          this.itemList = response.data.result;
        })
        .catch(err => console.log(err));
      this.$store
        .dispatch("positions/getData", "")
        .then(response => {
          response.data.result.forEach(element => {
            let data = {
              id: element.id,
              name: element.name
            }
            this.positionList.push(data)
          });
        })
        .catch(err => console.log(err));
    },

    editItem(item) {
      this.editedIndex = this.itemList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.itemList.indexOf(item);
      const data = Object.assign({}, item);

      confirm("Are you sure you want to delete this item?") &&
        this.$store
          .dispatch("users/deleteData", data)
          .then(response => {
            this.itemList.splice(index, 1);
            let obj = {
              alert: true,
              type: "success",
              message: "User successfully deleted."
            }
            this.alertDetails = obj;
          })
          .catch(err => console.log(err));
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          this.$store
            .dispatch("users/updateData", this.editedItem)
            .then(response => {
              if (response.data.status == 1) {
                let obj = {
                  alert: true,
                  type: "warning",
                  message: "No data changed."
                }
                this.alertDetails = obj;
              } else {
                let obj = {
                  alert: true,
                  type: "success",
                  message: "User successfully updated."
                }
                this.alertDetails = obj;
              }
            })
            .catch(err => console.log(err));
          Object.assign(this.itemList[this.editedIndex], this.editedItem);
        } else {
          this.$store
            .dispatch("users/saveData", this.editedItem)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: "User successfully created."
              }
              this.alertDetails = obj;
            })
            .catch(err => console.log(err));
          this.itemList.push(this.editedItem);
        }
        this.close();
      }
    }
  }
};
</script>