const generateMen = (menu) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children && menu[i].children.length <= 0) {
      delete menu[i].children
    }
    if (menu[i].children && menu[i].children.length > 0) {
      generateMen(menu[i].children)
    }
  }
  return menu
}
export const filerMenuData = (menu) => {
  const menuList = generateMen(menu)
  return menuList
}
