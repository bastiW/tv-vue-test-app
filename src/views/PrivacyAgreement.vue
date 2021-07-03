<template>
  <SettingsContentContainer heading="Privacy">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem fugiat qui quo? Assumenda consectetur eveniet harum, incidunt itaque maxime officiis perspiciatis quidem recusandae vel? Beatae doloremque quaerat quas similique sit!</p>
  </SettingsContentContainer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SettingsContentContainer from "@/components/SettingsContentContainer.vue";

export default defineComponent({
  name: "PrivacyAgreement",
  components: {
    SettingsContentContainer,
  },
});

</script>

<style scoped>

</style>
