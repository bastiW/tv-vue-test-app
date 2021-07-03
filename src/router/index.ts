import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import {navigationItems} from "../navigationItems";

let routes: RouteRecordRaw[] = []

function addRoute(navigationItem: any) {
  routes.push({
    path: navigationItem.path,
    name: navigationItem.name,
    component: navigationItem.component
  })

  if(!navigationItem.navigationChildren) {
    return
  }

  navigationItem.navigationChildren.forEach((navigationChild: any) => {
    addRoute(navigationChild)
  })
}

function generateRoutesFromNavigation() {
  navigationItems.forEach((navigationItem) => {
    addRoute(navigationItem)
  })
}

generateRoutesFromNavigation()

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
