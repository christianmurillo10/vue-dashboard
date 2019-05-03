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
    <v-toolbar color="#EEEEEE" dense>
      <v-toolbar-title><v-icon class="black--text">person_pin</v-icon> Roles</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>add_box</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline grey darken-3 white--text">
            <span><v-icon class="white--text">{{ formIcon }}</v-icon> {{ formTitle }}</span>
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
                      v-model="editedItem.name" 
                      :rules="validateItem.nameRules"
                      label="Name" 
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                      v-model="editedItem.description" 
                      :rules="validateItem.descriptionRules"
                      label="Description" 
                      required
                    ></v-text-field>
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
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <span class="justify-center layout px-0">No data found!</span>
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
      { text: "Name", value: "Name" },
      { text: "Description", value: "Description" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ],
    itemList: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      description: ""
    },
    defaultItem: {
      name: "",
      description: ""
    },
    valid: true,
    validateItem: {
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ],
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 250) || 'Description must be less than 250 characters'
      ],
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Role" : "Edit Role";
    },
    formIcon() {
      return this.editedIndex === -1 ? "add_box" : "edit";
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
        .dispatch("roles/getData", "")
        .then(response => {
          this.itemList = response.data.result;
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
          .dispatch("roles/deleteData", data)
          .then(response => {
            this.itemList.splice(index, 1);
            let obj = {
              alert: true,
              type: "success",
              message: "Role successfully deleted."
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
            .dispatch("roles/updateData", this.editedItem)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: "Role successfully updated."
              }
              this.alertDetails = obj;
              Object.assign(this.itemList[this.editedIndex], this.editedItem);
            })
            .catch(err => console.log(err));
        } else {
          this.$store
            .dispatch("roles/saveData", this.editedItem)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: "Role successfully created."
              }
              this.alertDetails = obj;
              this.itemList.push(this.editedItem);
            })
            .catch(err => console.log(err));
        }
        this.close();
      }
    }
  }
};
</script>