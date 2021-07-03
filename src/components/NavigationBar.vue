<template>
  <div
    class="logo"
    :class="{'no-opacity--animated': activeSection !== 'MainNavigation'}"
  >
  </div>
  <div
    ref="nav"
    class="nav"
    :class="{'nav-is-active': isNavigationActive}"
  >
    <div class="nav-column">
      <template
        v-for="(navigationItem,index) in navigationItems"
        :key="index"
      >
        <router-link
          tabindex="-1"
          :to="navigationItem.path"
          class="nav-item"
          :class="{
            'nav-item--bottom': navigationItem.bottom,
            'nav-item--hover': (navigationItem.name === hoveredInNavigationStore.first.name) && activeSection === 'MainNavigation',
            'nav-item--active': (navigationItem.name === hoveredInNavigationStore.first.name) && activeSection !== 'MainNavigation'
          }"
        >
          <i
            v-if="navigationItem.iconClass"
            :class="navigationItem.iconClass"
            class="nav-icon"
          />
          <span
            class="nav-text"
            :class="{'no-opacity--animated': moveColumnContentLeft}"
          >{{ navigationItem.label }}</span>
        </router-link>
      </template>
    </div>
    <div
      v-if="currentlyFocusedHasSecondaryChildren"
      class="nav-column"
      :class="{
        'nav-is-active': isNavigationActive,
        'nav-item--move-secondary-column-content-left': moveColumnContentLeft && !currentlyFocusedTertiaryNavigationItems,
        'nav-item--move-tertiary-column-content-left': moveColumnContentLeft && currentlyFocusedTertiaryNavigationItems
      }"
    >
      <template
        v-for="(navigationItem,index) in currentlyFocusedSecondaryNavigationItems"
        :key="index"
      >
        <router-link
          tabindex="-1"
          :to="navigationItem.path"
          class="nav-item"
          :class="{
            'nav-item-bottom': navigationItem.bottom,
            'nav-item--hover': nameHoveredSecondaryNavigation === navigationItem.name,
            'nav-item--hover-secondary': (nameHoveredSecondaryNavigation === navigationItem.name ) && activeSection !== 'SecondaryNavigation'
          }"
        >
          <i
            v-if="navigationItem.iconClass"
            :class="navigationItem.iconClass"
          />
          <span
            class="nav-text"
          >{{ navigationItem.label }}</span>
        </router-link>
      </template>
    </div>
    <div
      v-if="currentlyFocusedHasTertiaryChildren && activeSection !== 'MainNavigation'"
      class="nav-column"
      :class="{
        'nav-is-active': isNavigationActive,
        'nav-item--move-tertiary-column-content-left': moveColumnContentLeft
      }"
    >
      <template
        v-for="(navigationItem,index) in currentlyFocusedTertiaryNavigationItems"
        :key="index"
      >
        <router-link
          tabindex="-1"
          :to="navigationItem.path"
          class="nav-item"
          :class="{
            'nav-item-bottom': navigationItem.bottom,
            'nav-item--hover': nameHoveredTertiaryNavigation === navigationItem.name,
            'nav-item--hover-secondary': (nameHoveredTertiaryNavigation === navigationItem.name ) && activeSection !== 'TertiaryNavigation'
          }"
        >
          <i
            v-if="navigationItem.iconClass"
            :class="navigationItem.iconClass"
          />
          <span
            class="nav-text"
          >{{ navigationItem.label }}</span>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, watchEffect} from 'vue';
import {useNavigation} from "@/composables/useNavigation";


import {navigationItems} from "@/navigationItems";
import router from "@/router";


export default defineComponent({
  name: "NavigationBar",
  setup() {
    const {
      currentlyFocusedSecondaryNavigationItems,
      currentlyFocusedTertiaryNavigationItems,
      tertiaryNavigationColumnState,
      currentlyFocusedHasTertiaryChildren,
      currentlyFocusedNavigationRouteName,
      hoveredInNavigationStore,
      currentlyFocusedHasSecondaryChildren,
      activeSection,
      isNavigationActive,
      goLeft,
      goRight,
      firstNavigationColumnState,
      secondNavigationColumnState,
      isContentActive,
      indexHoveredInFirstNavigation,
      indexHoveredInSecondNavigation,
      nameHoveredSecondaryNavigation,
      nameHoveredTertiaryNavigation,
    } = useNavigation()

    return {
      isNavigationActive,
      currentlyFocusedSecondaryNavigationItems,
      currentlyFocusedTertiaryNavigationItems,
      currentlyFocusedHasSecondaryChildren,
      secondNavigationColumnState,
      firstNavigationColumnState,
      tertiaryNavigationColumnState,
      isContentActive,
      goLeft,
      goRight,
      activeSection,
      navigationItems,
      hoveredInNavigationStore,
      currentlyFocusedNavigationRouteName,
      currentlyFocusedHasTertiaryChildren,
      indexHoveredInFirstNavigation,
      indexHoveredInSecondNavigation,
      nameHoveredSecondaryNavigation,
      nameHoveredTertiaryNavigation,
    }
  },
  computed: {
    moveColumnContentLeft(): boolean {
      if (this.activeSection === 'SecondaryNavigation' || this.activeSection === 'TertiaryNavigation') {
        return true
      }
      if (this.secondNavigationColumnState.visible) {
        return false
      }
      if (this.activeSection === 'Content' && this.firstNavigationColumnState.size === 'foldedOut') {
        return true
      }
      if (this.firstNavigationColumnState.visible && this.firstNavigationColumnState.size === 'foldedOut') {
        return false
      }
      return true
    },
  },
  watch: {
    currentlyFocusedNavigationRouteName: function (currentlyFocusedNavigationRouteName) {
      router.push({name: currentlyFocusedNavigationRouteName})
    },
  },
  created() {
  },
  mounted() {

  },
  beforeUnmount() {

  },
  methods: {}

});
</script>
<style lang="scss" scoped>


.nav {
  --nav-item-height: 82px;
  --left-text-padding: 64px;
  margin-top: 62px;
  display: flex;
  flex-direction: row;

  .nav-text {
    position: relative;
    bottom: 0.75px;
  }

  .nav-icon {
    padding-right: 37.1px;
  }

  .nav-column {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    height: 100vh;

    &.nav-item--move-secondary-column-content-left {
      transform: translateX(calc(-1 * var(--navbar-expansion-x-diff-0-1)));
    }

    &.nav-item--move-tertiary-column-content-left {
      transform: translateX(calc(-1 * var(--navigation-bar-width--0-first-navigation-column-collapsed) + 64px) );
    }

  }

  a.nav-item {
    color: var(--text-color-secondary);
    height: var(--nav-item-height);
    text-decoration: none;
    display: block;
    line-height: var(--nav-item-height);

    &--active {
      color: var(--text-color-primary);
    }

    &--bottom {
      position: fixed;
      bottom: 45px;
      width: var(--navigation-bar-width--1-first-navigation-column-folded-out);
    }


    &:hover, &:focus, &--hover {
      background: var(--button-background-primary);
      color: var(--text-color-primary);
    }

    &--hover-secondary {
      background: var(--button-background-secondary);
    }

  }

  .nav-column:nth-child(1) {

    width: var(--navigation-bar-width--1-first-navigation-column-folded-out);


    a.nav-item {
      padding-left: 64px;
    }
  }

  .nav-column:nth-child(2) {



    a.nav-item {
      padding-left: 32px;
      width: var(--navigation-bar-width--1-first-navigation-column-folded-out);
    }
  }

  .nav-column:nth-child(3) {
    a.nav-item {
      width: var(--navigation-bar-width--1-first-navigation-column-folded-out);
      padding-left: 32px;
    }
  }


}
</style>
