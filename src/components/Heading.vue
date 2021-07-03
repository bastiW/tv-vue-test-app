<template>
  <div class="heading">
    <div
      class="sub-heading"
      :class="{'active': active && !heading}"
    >
      {{ subHeading }}
    </div>
    <div
      class="main-heading"
      :class="{'active': active && subHeading || active && heading && !subHeading}"
    >
      {{ heading }}
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
  name: "Heading",
  components: {},
  props: {
    heading: {
      type: String,
      required: false,
      default: undefined,
    },
    subHeading: {
      type: String,
      required: false,
      default: undefined,
    },
    active: {
      type: Boolean,
      default: true
    }
  },
});
</script>

<style lang="scss" scoped>
  .heading {
    color: var(--text-color-secondary);
    font-weight: bold;

    .main-heading {
      font-size: 1.1em;
      margin-top: 0;
      line-height: 0.9;

      transition-property: color;
      transition-duration: var(--transition-duration);
    }

    .active {
      color: var(--text-color-primary);
    }

    .sub-heading {
      margin-bottom: 0;
      font-size: var(--font-size-small);

      transition-property: color;
      transition-duration: var(--transition-duration);
    }

  }





</style>
