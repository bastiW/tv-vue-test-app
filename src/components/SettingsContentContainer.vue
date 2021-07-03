<template>
  <div class="settings-content-container">
    <heading
      class="heading"
      :heading="heading"
      :active="isContentActive"
    />
    <div
      v-keyboard-scroll
      class="content"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

import {useNavigation} from "@/composables/useNavigation";
import Heading from "@/components/Heading.vue";

export default defineComponent({
  name: "SettingsContentContainer",
  components: {
    Heading,
  },
  props: {
    heading: {
      type: String,
      required: true
    }
  },
  setup() {
    const { isContentActive } =  useNavigation()

    return {
      isContentActive,
    }

  },

});
</script>

<style lang="scss" scoped>
.settings-content-container {
  padding-top: 75px;
  width: 943px;
  left: 147px;
  position: absolute;

  .heading {
    margin-bottom: 61px;
  }

  .content {
    height: 760px;
    overflow-y: auto;
  }


}
</style>

