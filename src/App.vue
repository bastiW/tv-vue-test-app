<template>
  <div class="app-container">
    <div
      class="navigation-bar"
    >
      <NavigationBar ref="navigationBarRef" />
    </div>
    <div
      class="content-section"
      :class="contentClass"
    >
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">


import {defineComponent} from 'vue';
import NavigationBar from "@/components/NavigationBar.vue";

import {useNavigation} from "@/composables/useNavigation";
import tizen from "tizen-common-web";
import webapis from 'tizen-tv-webapis';

import {keyCodes} from "@/keyCodes";

type MenuTotalSizeClass =
    'content--0-first-navigation-column-collapsed' |
    'content--1-first-navigation-column-folded-out' |
    'content--2-first-navigation-column-collapsed-with-secondary-navigation-visible' |
    'content--3-first-navigation-column-folded-out-with-second-navigation-column' |
    'content--4-first-navigation-column-collapsed-with-second-and-tertiary-navigation-column'

export default defineComponent({
  name: "App",
  components: {NavigationBar},
  setup() {
    const {
      firstNavigationColumnState,
      secondNavigationColumnState,
      tertiaryNavigationColumnState,
      isContentActive,
      goLeft,
      goRight,
      activeSection,
      goDown,
      goUp,
      showSecondaryMenuWhileContentFocused,
      onExit
    } = useNavigation()

    return {
      goDown,
      goUp,
      isContentActive,
      activeSection,
      firstNavigationColumnState,
      secondNavigationColumnState,
      tertiaryNavigationColumnState,
      goLeft,
      goRight,
      showSecondaryMenuWhileContentFocused,
      onExit
    }
  },
  data() {
    return {
      scrollBehavior: 'auto' as ScrollBehavior,
      scrollSteps: 100,
      allKeyCodes: {
        escape: 'Escape',
        up: 'ArrowUp',
        down: 'ArrowDown',
        left: 'ArrowLeft',
        right: 'ArrowRight'
      },
      spatialSection: {
        content: 'content',
        navigation: 'navigation'
      }
    }
  },
  computed: {
    contentClass(): MenuTotalSizeClass {


      if( this.firstNavigationColumnState.size === 'foldedOut' && !this.secondNavigationColumnState.visible) {
        return 'content--1-first-navigation-column-folded-out'
      }

      if( this.firstNavigationColumnState.size === 'collapsed' && (this.activeSection === 'SecondaryNavigation' || this.showSecondaryMenuWhileContentFocused && this.activeSection === 'Content')  && !this.tertiaryNavigationColumnState.visible) {
        return 'content--2-first-navigation-column-collapsed-with-secondary-navigation-visible'
      }

      if( this.firstNavigationColumnState.size === 'foldedOut' && this.secondNavigationColumnState.visible && !this.tertiaryNavigationColumnState.visible) {
        return 'content--3-first-navigation-column-folded-out-with-second-navigation-column'
      }

      if( this.firstNavigationColumnState.size === 'collapsed' && this.secondNavigationColumnState.visible && this.tertiaryNavigationColumnState.visible ) {
        return 'content--4-first-navigation-column-collapsed-with-second-and-tertiary-navigation-column'
      }

      return 'content--0-first-navigation-column-collapsed'

    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.keyDownListener);
  },
  beforeMount() {
    window.addEventListener('keydown', this.keyDownListener);
  },
  methods: {
    scrollUp() {
      if(!this.isContentActive) {
        return
      }
      if(this.isContentActive) {
        window.document.querySelector('.content-section')!.scrollBy({ top: this.scrollSteps * -1, behavior: this.scrollBehavior })
      }
    },
    scrollDown() {
      if(this.isContentActive) {
        window.document.querySelector('.content-section')!.scrollBy({ top: this.scrollSteps, behavior: this.scrollBehavior })
      }
    },
    keyDownListener(e) {
      const keyCode = e.code;

      if(keyCode === keyCodes.escape ) {
        this.onExit()
      }

      if(keyCode === keyCodes.left) {
        this.goLeft()
      }
      if(keyCode === keyCodes.right) {
        this.goRight()
      }
      if(keyCode === keyCodes.down) {
        this.goDown();
      }
      if(keyCode === keyCodes.up) {
        this.goUp();
      }
    },
  }


});
</script>

<style lang="scss">

/* poppins-500 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  src: local(''),
  url('/fonts/poppins-v15-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
}
/* poppins-700 - latin */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  src: local(''),
  url('/fonts/poppins-v15-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
}

:root {
  --screen-width: 1980px;
  --screen-height: 1080px;

  --navigation-bar-width--0-first-navigation-column-collapsed: 145px;
  --navigation-bar-width--1-first-navigation-column-folded-out: 433px;
  --navigation-bar-width--2-first-navigation-column-collapsed-with-secondary-navigation-visible: calc(var(--navigation-bar-width--1-first-navigation-column-folded-out) + var(--navigation-bar-width--0-first-navigation-column-collapsed));
  --navigation-bar-width--3-first-navigation-column-out-with-second-navigation-column: calc(var(--navigation-bar-width--1-first-navigation-column-folded-out) * 2);
  --navigation-bar-width--4-first-navigation-column-collapsed-with-second-and-tertiary-navigation-column: calc(var(--navigation-bar-width--2-first-navigation-column-collapsed-with-secondary-navigation-visible) + var(--navigation-bar-width--1-first-navigation-column-folded-out));

  --navbar-expansion-x-diff-0-1: calc(var(--navigation-bar-width--1-first-navigation-column-folded-out) - var(--navigation-bar-width--0-first-navigation-column-collapsed));
  --navbar-expansion-x-diff-0-2: calc(var(--navigation-bar-width--2-first-navigation-column-collapsed-with-secondary-navigation-visible) - var(--navigation-bar-width--0-first-navigation-column-collapsed));
  --navbar-expansion-x-diff-0-3: calc(var(--navigation-bar-width--3-first-navigation-column-out-with-second-navigation-column) - var(--navigation-bar-width--0-first-navigation-column-collapsed));
  --navbar-expansion-x-diff-0-4: calc(var(--navigation-bar-width--4-first-navigation-column-collapsed-with-second-and-tertiary-navigation-column) - var(--navigation-bar-width--0-first-navigation-column-collapsed));

  --transition-duration: 300ms;
  --transition-timing-function: ease;

  --text-color-primary: #ffffff;
  --text-color-secondary: #CBCDE1;
  --font-size-base: 25px;
  --font-size-small: 21px;

  --button-background-primary: #737AAE;
  --button-background-secondary: #292D4A;
}

body {
  background-color: #171A36;
  color: var(--text-color-primary);
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 1.4rem;
  margin-bottom: 0.3rem;
}

p {
  margin-bottom: 1rem;
  margin-top: 0;
}

.debug-info {
  position: fixed;
  top: 0px;
  right: 0px;
  width: 400px;
  min-height: 200px;
  background: antiquewhite;
  color: black;
  z-index: 20000;
}


#app {
  font-family: 'Poppins';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: var(--font-size-base);

}

.app-container {
  display: flex;
  flex-direction: row;
}

.hidden {
  visibility: hidden;
}

.no-opacity--animated {
  opacity: 0;
  transition-property: opacity;
  transition-duration: var(--transition-duration);
  transition-timing-function: var(--transition-timing-function);
}

.text-left {
  text-align: left !important;
}

.text-center {
  text-align: center !important;
}

.text-right {
  text-align: right !important;
}

.strong {
  font-weight: bold !important;
}


.app-container {

  .navigation-bar {
    width: var(--navigation-bar-width--3-first-navigation-column-out-with-second-navigation-column);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }



  .content-section {
    transition-property: transform;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);

    left: var(--navigation-bar-width--0-first-navigation-column-collapsed);
    position: fixed;
    top: 0;
    right: 0;
    background-image: url('/content-background.png'); // Use png background because it renders much faster on Samsung TV than fancy background CSS in combination with the animation
    border-radius: 40px 0px 0px 40px;
    display: flex;
    justify-content: center;
    height: 100%;

    &.content--0-main-navigation-collapsed {
    }

    &.content--1-first-navigation-column-folded-out {
      transform: translateX(var(--navbar-expansion-x-diff-0-1));
    }

    &.content--2-first-navigation-column-collapsed-with-secondary-navigation-visible {
      transform: translateX(var(--navbar-expansion-x-diff-0-2));
    }

    &.content--3-first-navigation-column-folded-out-with-second-navigation-column {
      transform: translateX(var(--navbar-expansion-x-diff-0-3));
    }

    &.content--4-first-navigation-column-collapsed-with-second-and-tertiary-navigation-column {
      transform: translateX(var(--navbar-expansion-x-diff-0-4));
    }
  }

  .network-error {
    z-index: 1;
    position: absolute;
    right: 30px;
    bottom: 0px;
    background: radial-gradient(#262a4c, transparent);
  }

}



</style>





