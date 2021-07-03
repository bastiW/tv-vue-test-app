import {computed, reactive, ref, watch, watchEffect} from 'vue'
import {useRouter, useRoute, } from 'vue-router'
import {NavigationItem, navigationItems} from "@/navigationItems";

export type Section = 'MainNavigation' | 'SecondaryNavigation' | 'TertiaryNavigation' | 'Content'

type FirstColumnSize = "collapsed" | "foldedOut";

type NavigationState = {
    visible?: boolean,
    size?: FirstColumnSize
}

let firstNavigationColumnState = reactive<NavigationState>({
    size: 'collapsed'
})

let secondNavigationColumnState = reactive<NavigationState>({
    visible: false
})

let tertiaryNavigationColumnState = reactive<NavigationState>({
    visible: false
})


type HoveredInNavigation = {
    index: number,
    name: string
}


type HoveredInNavigationStore = {
    first: HoveredInNavigation,
    second: HoveredInNavigation[],
    tertiary: HoveredInNavigation[][]
}

function getSecondNavigationDefaultValues(): HoveredInNavigation[] {

    let secondNavigationValues: HoveredInNavigation[] = new Array()

    navigationItems.forEach((navigationItem, index) => {
        const navigationChildren = navigationItem.navigationChildren;
        if(navigationChildren) {
            secondNavigationValues[index] = {
                index: 0,
                name: navigationChildren[0].name
            }
        }
    })

    return  secondNavigationValues
}

function getTertiaryNavigationDefaultValues(): HoveredInNavigation[][] {

    let tertiaryNavigationValues: HoveredInNavigation[][] = new Array()

    navigationItems.forEach((outerNavigationItem, outerIndex) => {
        const navigationChildren = outerNavigationItem.navigationChildren;
        if(navigationChildren) {
            tertiaryNavigationValues[outerIndex] = new Array()
            navigationChildren.forEach((outerNavigationItem, innerIndex) => {
                const navigationChildren = outerNavigationItem.navigationChildren;
                if(navigationChildren) {
                    tertiaryNavigationValues[outerIndex][innerIndex] = {
                        index: 0,
                        name: navigationChildren[0].name
                    }
                }
            })
        }
    })
    return  tertiaryNavigationValues
}

let hoveredInNavigationStore = reactive<HoveredInNavigationStore>({
    first: {
        index: 0,
        name: navigationItems[0].name
    },
    second: getSecondNavigationDefaultValues(),
    tertiary: getTertiaryNavigationDefaultValues()
})

let activeSection = ref<Section>('Content')


export function useNavigation() {
    function goToMainNavigation() {
        firstNavigationColumnState.visible = true
        firstNavigationColumnState.size = 'foldedOut'
        activeSection.value = 'MainNavigation'
        tertiaryNavigationColumnState.visible = false
    }

    function goToSecondaryMenu() {
        activeSection.value = 'SecondaryNavigation'
        firstNavigationColumnState.size = 'collapsed'
    }

    function goToTertiaryMenu() {
        activeSection.value = 'TertiaryNavigation'
        firstNavigationColumnState.size = 'collapsed'
        secondNavigationColumnState.visible = true
        tertiaryNavigationColumnState.visible = true
    }


    function goToContent() {
        activeSection.value = 'Content'

        firstNavigationColumnState.size = 'collapsed'
        secondNavigationColumnState.visible = false
        tertiaryNavigationColumnState.visible = false
    }


    function goUpSecondaryNavigation() {
        const hoveredInSecondaryNavigationElement = hoveredInNavigationStore.second[indexHoveredInFirstNavigation.value];

        if (hoveredInSecondaryNavigationElement.index === 0 || !currentlyFocusedSecondaryNavigationItems.value) {
            return
        }

        hoveredInSecondaryNavigationElement.index -= 1
        hoveredInSecondaryNavigationElement.name = currentlyFocusedSecondaryNavigationItems.value[hoveredInSecondaryNavigationElement.index].name
    }

    function goUpTertiaryNavigation() {
        const hoveredInTertiaryNavigationElement = hoveredInNavigationStore.tertiary[indexHoveredInFirstNavigation.value][indexHoveredInSecondNavigation.value];

        if (hoveredInTertiaryNavigationElement.index === 0 || !currentlyFocusedTertiaryNavigationItems.value) {
            return
        }

        hoveredInTertiaryNavigationElement.index -= 1
        hoveredInTertiaryNavigationElement.name = currentlyFocusedTertiaryNavigationItems.value[hoveredInTertiaryNavigationElement.index].name
    }

    function goUpMainNavigation() {
        if (hoveredInNavigationStore.first.index === 0) {
            return
        }
        hoveredInNavigationStore.first.index -= 1
        hoveredInNavigationStore.first.name = navigationItems[hoveredInNavigationStore.first.index].name
    }

    function goUp() {
        switch (activeSection.value) {
            case  'MainNavigation': {
                goUpMainNavigation();
                break;
            }
            case  'SecondaryNavigation': {
                goUpSecondaryNavigation();
                break;
            }
            case  'TertiaryNavigation': {
                goUpTertiaryNavigation();
                break;
            }
        }
    }



    function goDownMainNavigation() {
        if (hoveredInNavigationStore.first.index === navigationItems.length - 1) {
            return
        }
        hoveredInNavigationStore.first.index += 1
        hoveredInNavigationStore.first.name = navigationItems[hoveredInNavigationStore.first.index].name
    }

    function goDownSecondaryNavigation() {
        const hoveredInSecondaryNavigationElement = hoveredInNavigationStore.second[hoveredInNavigationStore.first.index];

        if(!currentlyFocusedMainNavigationItem.value.navigationChildren || !currentlyFocusedSecondaryNavigationItems.value ) {
            return;
        }

        if (hoveredInSecondaryNavigationElement.index === currentlyFocusedMainNavigationItem.value.navigationChildren?.length - 1) {
            return
        }

        hoveredInSecondaryNavigationElement.index += 1
        hoveredInSecondaryNavigationElement.name = currentlyFocusedSecondaryNavigationItems.value[hoveredInSecondaryNavigationElement.index].name
    }

    function goDownTertiaryNavigation() {
        const hoveredInTertiaryNavigationElement = hoveredInNavigationStore.tertiary[indexHoveredInFirstNavigation.value][indexHoveredInSecondNavigation.value];

        if(!currentlyFocusedSecondaryNavigationItem.value?.navigationChildren || !currentlyFocusedTertiaryNavigationItems.value ) {
            return;
        }

        if (hoveredInTertiaryNavigationElement.index === currentlyFocusedSecondaryNavigationItem.value?.navigationChildren?.length - 1) {
            return
        }

        hoveredInTertiaryNavigationElement.index += 1
        hoveredInTertiaryNavigationElement.name = currentlyFocusedTertiaryNavigationItems.value[hoveredInTertiaryNavigationElement.index].name
    }


    function goDown() {
        switch (activeSection.value) {
            case  'MainNavigation': {
                goDownMainNavigation();
                break;
            }
            case  'SecondaryNavigation': {
                goDownSecondaryNavigation();
                break;
            }
            case  'TertiaryNavigation': {
                goDownTertiaryNavigation();
                break;
            }

        }
    }

    function goRight() {
        switch (activeSection.value) {
            case "MainNavigation":
                if (currentlyFocusedHasSecondaryChildren.value) {
                    goToSecondaryMenu()
                } else if(currentlyFocusedHasTertiaryChildren.value) {
                    goToTertiaryMenu()
                } else {
                    goToContent()
                }
                break
            case "SecondaryNavigation":
                if(currentlyFocusedHasTertiaryChildren.value) {
                    goToTertiaryMenu()
                } else {
                    goToContent()
                }
                break
            case "TertiaryNavigation":
                goToContent()
                break
            default:
                break
        }
    }

    function goLeft() {
        switch (activeSection.value) {
            case "Content":
                if (currentlyFocusedHasTertiaryChildren.value) {
                    goToTertiaryMenu()

                } else if(currentlyFocusedHasSecondaryChildren.value) {
                    goToSecondaryMenu()
                } else {
                    goToMainNavigation()
                }
                break
            case "TertiaryNavigation":
                goToSecondaryMenu()
                break
            case "SecondaryNavigation":
                goToMainNavigation()
                break
            default:
                break
        }
    }

    function exit() {
        // @ts-ignore
        window.tizen.application.getCurrentApplication().hide()
    }
    
    function onExit() {
        if(activeSection.value === 'MainNavigation' && currentlyFocusedNavigationRouteName.value === 'MatchesOfDay') {
            exit()
        } else if(activeSection.value === 'Content' || activeSection.value === 'SecondaryNavigation' ) {
            goLeft()
        } else if(activeSection.value === 'MainNavigation' ) {
            goUp()
            goUp()
        }
    }

    const currentlyFocusedNavigationRouteName = computed<string>(() => {
        if(currentlyFocusedHasSecondaryChildren.value) {
            const hoveredInSecondaryNavigationElement = hoveredInNavigationStore.second[hoveredInNavigationStore.first.index];
            return hoveredInSecondaryNavigationElement.name
        }

        return hoveredInNavigationStore.first.name
    })

    const currentlyFocusedMainNavigationItem = computed<NavigationItem>(() => {
        return navigationItems.filter((navigationItem) => navigationItem.name === hoveredInNavigationStore.first.name)[0]
    })

    const currentlyFocusedSecondaryNavigationItem = computed<NavigationItem | undefined>(() => {
        return navigationItems[hoveredInNavigationStore.first.index].navigationChildren?.filter((navigationItem) => navigationItem.name === hoveredInNavigationStore.second[hoveredInNavigationStore?.first?.index]?.name)[0]
    })

    const currentlyFocusedSecondaryNavigationItems = computed<NavigationItem[] | undefined>(() => {
        return currentlyFocusedMainNavigationItem.value?.navigationChildren
    })

    const currentlyFocusedTertiaryNavigationItems = computed<NavigationItem[] | undefined>(() => {
        return currentlyFocusedSecondaryNavigationItem.value?.navigationChildren
    })

    const showSecondaryMenuWhileContentFocused = computed<boolean>(() => {
        return currentlyFocusedMainNavigationItem.value?.showSubMenuWhileContentIsActive?? false
    })

    const currentlyFocusedHasSecondaryChildren = computed<boolean>(() => {
        return !!currentlyFocusedSecondaryNavigationItems.value?.length
    })

    const currentlyFocusedHasTertiaryChildren = computed<boolean>(() => {
        return !!currentlyFocusedTertiaryNavigationItems.value?.length
    })

    const isContentActive = computed<boolean>(() => {
        return activeSection.value === 'Content'
    })

    const isNavigationActive = computed<boolean>(() => {
        return activeSection.value !== 'Content'
    })

    const indexHoveredInFirstNavigation = computed<number>(() => {
        return hoveredInNavigationStore.first.index
    })
    const indexHoveredInSecondNavigation = computed<number>(() => {
        return hoveredInNavigationStore.second[indexHoveredInFirstNavigation.value].index
    })
    const nameHoveredSecondaryNavigation = computed<string>(() => {
        return hoveredInNavigationStore.second[indexHoveredInFirstNavigation.value]?.name
    })
    const nameHoveredTertiaryNavigation = computed<string>(() => {
        return hoveredInNavigationStore.tertiary[indexHoveredInFirstNavigation.value][indexHoveredInSecondNavigation.value]?.name
    })




    watchEffect(() => {
        if(currentlyFocusedHasSecondaryChildren.value && activeSection.value === 'MainNavigation') {
            secondNavigationColumnState.visible = true
        }

        if(!currentlyFocusedHasSecondaryChildren.value && activeSection.value === 'MainNavigation') {
            secondNavigationColumnState.visible = false
        }

        if(currentlyFocusedHasTertiaryChildren.value && activeSection.value === 'SecondaryNavigation') {
            tertiaryNavigationColumnState.visible = true
        }

        if(!currentlyFocusedHasTertiaryChildren.value && activeSection.value === 'SecondaryNavigation') {
            tertiaryNavigationColumnState.visible = false
        }

    })

    return {
        goDown,
        goUp,
        goLeft,
        goRight,
        onExit,
        currentlyFocusedMainNavigationItem,
        currentlyFocusedSecondaryNavigationItems,
        currentlyFocusedTertiaryNavigationItems,
        currentlyFocusedHasSecondaryChildren,
        currentlyFocusedHasTertiaryChildren,
        showSecondaryMenuWhileContentFocused,
        firstNavigationColumnState,
        secondNavigationColumnState,
        tertiaryNavigationColumnState,
        activeSection,
        isContentActive,
        isNavigationActive,
        hoveredInNavigationStore,
        currentlyFocusedNavigationRouteName,
        indexHoveredInFirstNavigation,
        indexHoveredInSecondNavigation,
        nameHoveredSecondaryNavigation,
        nameHoveredTertiaryNavigation,
    }
}
