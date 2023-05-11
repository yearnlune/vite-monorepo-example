<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-title>
        <router-link to="/"> VITE MONOREPO EXAMPLE </router-link>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts"></script>
