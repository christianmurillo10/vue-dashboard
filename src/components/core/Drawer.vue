<template>
  <v-navigation-drawer 
    id="app-drawer"
    v-model="primaryDrawer.model"
    :permanent="primaryDrawer.type === 'permanent'"
    :temporary="primaryDrawer.type === 'temporary'"
    :clipped="primaryDrawer.clipped"
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini"
    absolute
    overflow
    app
    dark
    mobile-break-point="991"
    width="260"
  >
    <v-list>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="logo">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>Vue Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list two-line subheader>
        <v-divider></v-divider>

        <v-list-tile v-if="responsive">
          <v-text-field
            label="Search..."
            dark
            flat
            solo-inverted
            hide-details
            clearable
          ></v-text-field>
        </v-list-tile>
      </v-list>

      <v-list
        class="pt-0" 
        dense
        v-for="(mainLink, i) in mainLinks"
        :key="i"
      >
        <v-list-tile 
          v-if="mainLink.isParent === 0"
          :to="mainLink.to"
        >
          <v-list-tile-action>
            <v-icon>{{ mainLink.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ mainLink.text }}</v-list-tile-title>
        </v-list-tile>

        <v-list-group
          v-else-if="mainLink.isParent === 1"
          :prepend-icon="mainLink.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>{{ mainLink.text }}</v-list-tile-title>
            </v-list-tile>
          </template>

          <v-list
            v-for="(subLink, i) in mainLink.subLinks"
            :key="i"
          >
            <v-list-tile 
              v-if="subLink.isParent === 0"
              :to="subLink.to"
            >
              <v-list-tile-action>
                <v-icon>{{ subLink.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>{{ subLink.text }}</v-list-tile-title>
            </v-list-tile>

            <v-list-group
              v-if="subLink.isParent === 1"
              no-action
              sub-group
            >
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-action>
                    <v-icon>{{ subLink.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>{{ subLink.text }}</v-list-tile-title>
                </v-list-tile>
              </template>

              <v-list
                v-for="(link, i) in subLink.links"
                :key="i"
              >
                <v-list-tile 
                  v-if="link.isParent === 0"
                  :to="link.to"
                >
                  <v-list-tile-action>
                    <v-icon>{{ link.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-title>{{ link.text }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-list-group>
          </v-list>
        </v-list-group>
      </v-list>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data: () => ({
    logo: './img/logo.png',
    mainLinks: [
      {
        to: '/',
        icon: 'dashboard',
        text: 'Dashboard',
        type: 1,
        isParent: 0
      },
      {
        to: '/users',
        icon: 'person',
        text: 'Users',
        type: 1,
        isParent: 0
      },
      {
        icon: 'device_hub',
        text: 'RBAC',
        type: 1,
        isParent: 1,
        subLinks: [
          {
            to: '/roles',
            icon: 'view_list',
            text: 'Roles',
            type: 2,
            isParent: 0
          },
          {
            icon: 'settings_applications',
            text: 'Others',
            type: 2,
            isParent: 1,
            links: [
              {
                to: '/positions',
                icon: 'person_pin',
                text: 'Positions',
                type: 2,
                isParent: 0
              }
            ]
          },
        ]
      },
    ],
    responsive: true
  }),
  computed : {
    ...mapState('toolbar', ['primaryDrawer']),
  },
}
</script>
