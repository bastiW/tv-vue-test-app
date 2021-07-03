import {keyCodes} from "@/keyCodes";
import {Directive, nextTick} from "vue";
import {useNavigation} from "@/composables/useNavigation";

let scrollElement: Element | null
const scrollSteps = 100
const scrollBehavior: ScrollBehavior = 'auto'

const {
    isContentActive,
} = useNavigation()

function scrollUp() {
    if(!scrollElement || !isContentActive.value) {
        return
    }
    scrollElement.scrollBy({ top: scrollSteps * -1, behavior: scrollBehavior })
}
function scrollDown() {
    if(!scrollElement || !isContentActive.value) {
        return
    }
    scrollElement.scrollBy({ top: scrollSteps, behavior: scrollBehavior })
}

function onKeyPress(e) {
    if(e.code === keyCodes.down) {
        scrollDown()
    }

    if(e.code === keyCodes.up) {
        scrollUp()
    }
}

export const keyboardScroll: Directive = {
    beforeMount(element) {
        scrollElement = element;
        window.addEventListener('keydown', onKeyPress);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', onKeyPress);
    },

}