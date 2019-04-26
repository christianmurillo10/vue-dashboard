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
      <v-toolbar-title><v-icon class="black--text">person_pin</v-icon> Positions</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>person_add</v-icon>
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
      { text: "Name", value: "Name" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ],
    itemList: [],
    editedIndex: -1,
    editedItem: {
      name: ""
    },
    defaultItem: {
      name: ""
    },
    valid: true,
    validateItem: {
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 50) || 'Name must be less than 50 characters'
      ]
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Position" : "Edit Position";
    },
    formIcon() {
      return this.editedIndex === -1 ? "person_add" : "edit";
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
        .dispatch("positions/getData", "")
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
          .dispatch("positions/deleteData", data)
          .then(response => {
            this.itemList.splice(index, 1);
            let obj = {
              alert: true,
              type: "success",
              message: "Position successfully deleted."
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
            .dispatch("positions/updateData", this.editedItem)
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
                  message: "Position successfully updated."
                }
                this.alertDetails = obj;
              }
            })
            .catch(err => console.log(err));
          Object.assign(this.itemList[this.editedIndex], this.editedItem);
        } else {
          this.$store
            .dispatch("positions/saveData", this.editedItem)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: "Position successfully created."
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