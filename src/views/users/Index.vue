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
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.username" label="Username"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                    v-model="editedItem.password" 
                    :append-icon="show1 ? 'visibility' : 'visibility_off'"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-select
                    :items="positionList"
                    item-value="id"
                    item-text="name"
                    v-model="editedItem.position_id"
                    label="Position"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="itemList" class="elevation-1">
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.username }}</td>
        <td class="text-xs-left">{{ props.item.password }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.position_id }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    dialog: false,
    alertDetails: {
      alert: false,
      type: "success",
      message: ""
    },
    headers: [
      { text: "Username", value: "username" },
      { text: "Password", value: "password" },
      { text: "Email", value: "email" },
      { text: "Position", value: "position_id" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ],
    itemList: [],
    positionList: [],
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
    }
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
      if (this.editedIndex > -1) {
        this.$store
          .dispatch("users/updateData", this.editedItem)
          .then(response => {
            let obj = {
              alert: true,
              type: "success",
              message: "User successfully updated."
            }
            this.alertDetails = obj;
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
};
</script>