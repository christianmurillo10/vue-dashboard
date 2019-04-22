<template>
  <div>
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
                  <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.positionId" label="Position"></v-text-field>
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
    <v-data-table
      :headers="headers"
      :items="itemList"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.username }}</td>
        <td class="text-xs-left">{{ props.item.password }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-left">{{ props.item.positionId }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
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
      dialog: false,
      headers: [
        { text: 'Username',value: 'username' },
        { text: 'Password', value: 'password' },
        { text: 'Email', value: 'email' },
        { text: 'Position', value: 'positionId' },
        { text: 'Actions', align: 'center', value: 'name', sortable: false }
      ],
      itemList: [],
      editedIndex: -1,
      editedItem: {
        username: '',
        password: '',
        email: '',
        positionId: null
      },
      defaultItem: {
        username: '',
        password: '',
        email: '',
        positionId: null
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.itemList = [
          {
            username: 'User 1',
            password: 'user1',
            email: 'user1@mail.com',
            positionId: 1,
          },
          {
            username: 'User 2',
            password: 'user2',
            email: 'user2@mail.com',
            positionId: 1,
          },
          {
            username: 'User 3',
            password: 'user3',
            email: 'user3@mail.com',
            positionId: 1,
          },
          {
            username: 'User 4',
            password: 'user4',
            email: 'user4@mail.com',
            positionId: 1,
          },
          {
            username: 'User 5',
            password: 'user5',
            email: 'user5@mail.com',
            positionId: 1,
          },
          {
            username: 'User 6',
            password: 'user6',
            email: 'user6@mail.com',
            positionId: 1,
          },
          {
            username: 'User 7',
            password: 'user7',
            email: 'user7@mail.com',
            positionId: 1,
          },
          {
            username: 'User 8',
            password: 'user8',
            email: 'user8@mail.com',
            positionId: 1,
          },
          {
            username: 'User 9',
            password: 'user9',
            email: 'user9@mail.com',
            positionId: 1,
          },
          {
            username: 'User 10',
            password: 'user10',
            email: 'user10@mail.com',
            positionId: 1,
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.itemList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.itemList.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.itemList.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.itemList[this.editedIndex], this.editedItem)
        } else {
          this.itemList.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>