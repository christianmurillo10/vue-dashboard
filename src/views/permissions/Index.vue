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
      <v-toolbar-title><v-icon class="black--text">view_list</v-icon> Permissions</v-toolbar-title>
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
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                      v-model="editedItem.code" 
                      :rules="validateItem.codeRules"
                      label="Code" 
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                      v-model="editedItem.route" 
                      label="Route" 
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                      v-model="editedItem.order" 
                      :rules="validateItem.orderRules"
                      label="Order" 
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                      v-model="editedItem.parent_id" 
                      label="Parent" 
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select
                      :items="typeLists"
                      item-value="id"
                      item-text="name"
                      v-model="editedItem.type"
                      :rules="validateItem.typeRules"
                      label="Type"
                      required
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-select
                      :items="isParentLists"
                      item-value="id"
                      item-text="name"
                      v-model="editedItem.is_parent"
                      :rules="validateItem.isParentRules"
                      label="Is Parent"
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
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="text-xs-left">{{ props.item.code }}</td>
        <td class="text-xs-left">{{ props.item.route }}</td>
        <td class="text-xs-left">{{ props.item.order }}</td>
        <td class="text-xs-left">{{ props.item.parent_id }}</td>
        <td class="text-xs-left">{{ props.item.type }}</td>
        <td class="text-xs-left">{{ props.item.is_parent }}</td>
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
      { text: "Code", value: "Code" },
      { text: "Route", value: "Route" },
      { text: "Parent", value: "Parent" },
      { text: "Type", value: "Type" },
      { text: "Is Parent", value: "Is Parent" },
      { text: "Actions", align: "center", value: "name", sortable: false }
    ],
    itemList: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      description: "",
      code: "",
      route: "",
      order: "",
      parent_id: "",
      type: "",
      is_parent: ""
    },
    defaultItem: {
      name: "",
      description: "",
      code: "",
      route: "",
      order: "",
      parent_id: "",
      type: "",
      is_parent: 1
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
      codeRules: [
        v => !!v || 'Code is required',
        v => (v && v.length <= 50) || 'Code must be less than 50 characters'
      ],
      routeRules: [
        v => !!v || 'Route is required',
        v => (v && v.length <= 50) || 'Route must be less than 50 characters'
      ],
      orderRules: [
        v => !!v || 'Order is required'
      ],
      parentRules: [
        v => !!v || 'Parent is required'
      ],
      typeRules: [
        v => !!v || 'Type is required'
      ],
      isParentRules: [
        v => !!v || 'Is Parent is required'
      ],
    },
    typeLists: [
      {id: 1, name: "Main Menu"},
      {id: 2, name: "Sub Menu"},
      {id: 3, name: "Others"}
    ],
    isParentLists: [
      {id: 0, name: "No"},
      {id: 1, name: "Yes"}
    ]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Permission" : "Edit Permission";
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
        .dispatch("permissions/getData", "")
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
          .dispatch("permissions/deleteData", data)
          .then(response => {
            this.itemList.splice(index, 1);
            let obj = {
              alert: true,
              type: "success",
              message: "Permission successfully deleted."
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
            .dispatch("permissions/updateData", this.editedItem)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: "Permission successfully updated."
              }
              this.alertDetails = obj;
              Object.assign(this.itemList[this.editedIndex], this.editedItem);
            })
            .catch(err => console.log(err));
        } else {
          this.$store
            .dispatch("permissions/saveData", this.editedItem)
            .then(response => {
              let obj = {
                alert: true,
                type: "success",
                message: "Permission successfully created."
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