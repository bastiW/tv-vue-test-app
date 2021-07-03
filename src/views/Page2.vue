<template>
  <div
      v-keyboard-scroll
      class="page-2-container"
  >
    <heading
        :heading="'Heading'"
        sub-heading="Sub heading"
        :active="isContentActive"
    />
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci amet, animi, cumque dolore dolores earum excepturi explicabo fuga ipsa natus numquam pariatur perspiciatis quibusdam rerum sapiente tempore voluptate, voluptatem.</p>
  </div>
</template>

<script lang="ts">
import {defineComponent } from 'vue';

import Heading from "@/components/Heading.vue";
import {useNavigation} from "@/composables/useNavigation";

export default defineComponent({
  name: "Table",
  components: {
    Heading,
  },
  setup() {
    const { isContentActive } =  useNavigation()

    return {
      isContentActive,
    }

  },
  data() {
    return {
    }
  },
  computed: {

  },

});
</script>

<style lang="scss" scoped>
  .page-2-container {

    --image-max-width: 38px;
    --table-total-height: 869px;
    --table-header-height: 83px;
    --table-body-height: calc(100% - var(--table-header-height));

    padding-top: 75px;
    width: 1353px;

    .heading {
      margin-bottom: 15px;
    }

  }
</style>

