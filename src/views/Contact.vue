<template>
  <settings-content-container
    heading="Contact"
  >
    <h3>About me</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      Aut distinctio est illum laboriosam quam voluptas.
      Ab aspernatur doloribus ea, est et eum iste officia, officiis quae ratione sed sint, totam!
    </p>
  </settings-content-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SettingsContentContainer from "@/components/SettingsContentContainer.vue";

export default defineComponent({
  name: "Contact",
  components: {
    SettingsContentContainer,
  },
  mounted() {
  }
});

</script>

<style scoped>

</style>
