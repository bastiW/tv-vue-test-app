<template>
  <div
    v-keyboard-scroll
    class="page-1-container"
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
import { defineComponent } from 'vue';

import Heading from "@/components/Heading.vue";
import {useNavigation} from "@/composables/useNavigation";


export default defineComponent({
  name: 'Matches',
  components: {
    Heading,
  },
  setup() {
    const { isContentActive } = useNavigation()


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
  methods: {

  }
});
</script>

<style lang="scss" scoped>
.page-1-container {
  display: flex;
  flex-direction: column;
  width: 1170px;
  padding: 50px 0;
  overflow-y: hidden;


}

</style>
