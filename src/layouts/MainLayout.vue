<template>
  <q-layout
  view="hHh Lpr fFf"
  class="q-pa-md"
  :class="bg"
  >

    <q-header
    class="q-pa-md"
    :class="bg"
    >
      <q-toolbar>

        <q-toolbar-title :style="{ fontSize: '36px' }">
          To DO
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          size="24px"
          :icon="icon"
          aria-label="Settings"
          :to="path"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>


  </q-layout>
</template>

<script setup>
import { bg } from "@/constants";

import { useRoute } from "vue-router ";
import { computed, watch, ref } from "vue";

const route = useRoute();

const routePath = computed(() => route.path);

const icon = ref("settings");
const path = ref("/setting");

watch(routePath, (val) => {
  if (val === "/") {
    icon.value = "settings";
    path.value = "/setting";
  } else {
    icon.value = "home";
    path.value = "/";
  }
}, { immediate:true });


defineOptions({
  name: "MainLayout",
});
</script>
